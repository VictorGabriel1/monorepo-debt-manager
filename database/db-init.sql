-- Gerador de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criação da tabela users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    birthdate DATE NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    deleted_at TIMESTAMP(6)
);

-- Enum para Status
CREATE TYPE debt_status AS ENUM ('PENDING', 'PAID', 'LATE');

-- Tabela de Dívidas (debts)
CREATE TABLE debts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(60) NOT NULL,
    user_id UUID NOT NULL, -- Referência ao devedor
    total_amount DECIMAL(10, 2) NOT NULL, -- Valor total da dívida
    paid_amount DECIMAL(10, 2) DEFAULT 0 NOT NULL, -- Valor já pago
    status debt_status NOT NULL DEFAULT 'PENDING', -- Status da dívida
    due_date DATE NOT NULL, -- Data de vencimento geral da dívida
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    deleted_at TIMESTAMP(6), -- Soft delete
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de Parcelas (debt_installments)
CREATE TABLE debt_installments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    debt_id UUID NOT NULL, -- Referência à dívida principal
    installment_number INT NOT NULL, -- Número da parcela
    amount DECIMAL(10, 2) NOT NULL, -- Valor da parcela
    paid_amount DECIMAL(10, 2) DEFAULT 0 NOT NULL, -- Valor já pago na parcela
    due_date DATE NOT NULL, -- Data de vencimento da parcela
    status debt_status NOT NULL DEFAULT 'PENDING', -- Status da parcela
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6) NOT NULL,
    deleted_at TIMESTAMP(6), -- Soft delete
    FOREIGN KEY (debt_id) REFERENCES debts(id) ON DELETE CASCADE
);

CREATE OR REPLACE FUNCTION update_debt_status()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE debts
    SET status = CASE
        WHEN NOT EXISTS (
            SELECT 1 FROM debt_installments WHERE debt_id = NEW.debt_id AND status = 'PENDING'
        ) AND NOT EXISTS (
            SELECT 1 FROM debt_installments WHERE debt_id = NEW.debt_id AND status = 'LATE'
        )
        THEN 'PAID'::debt_status
        WHEN EXISTS (
            SELECT 1 FROM debt_installments WHERE debt_id = NEW.debt_id AND status = 'LATE'
        )
        THEN 'LATE'::debt_status
        ELSE 'PENDING'::debt_status
    END,
    paid_amount = (
        SELECT SUM(paid_amount) FROM debt_installments WHERE debt_id = NEW.debt_id
    )
    WHERE id = NEW.debt_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_debt_status
AFTER INSERT OR UPDATE ON debt_installments
FOR EACH ROW
EXECUTE FUNCTION update_debt_status();

-- Função genérica para atualizar a coluna updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP(6);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
