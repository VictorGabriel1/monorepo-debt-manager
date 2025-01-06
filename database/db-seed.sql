-- Inserir usuários
INSERT INTO users (name, email, password, cpf, birthdate) VALUES
('Alice Silva', 'alice@example.com', '$2b$12$PiuuGmwPCGFzW2mmmusJgenjSTmiOCf33ay8iJ8/vjqntNQl5Pd.S', '12345678901', '1990-05-20'),
('Bob Santos', 'bob@example.com', '$2b$12$PiuuGmwPCGFzW2mmmusJgenjSTmiOCf33ay8iJ8/vjqntNQl5Pd.S', '98765432109', '1985-03-15'),
('Carol Souza', 'carol@example.com', '$2b$12$PiuuGmwPCGFzW2mmmusJgenjSTmiOCf33ay8iJ8/vjqntNQl5Pd.S', '45612378900', '1992-08-10');

-- Inserir dívidas
INSERT INTO debts (user_id, title, description, total_amount, paid_amount, status, due_date) VALUES
((SELECT id FROM users WHERE email = 'alice@example.com'),'Cartão 1', 'Compra de eletrodomésticos', 500.00, 0.00, 'PENDING', '2025-02-01'),
((SELECT id FROM users WHERE email = 'bob@example.com'),'Cartão 2', 'Curso de inglês', 1000.00, 200.00, 'PENDING', '2025-03-01'),
((SELECT id FROM users WHERE email = 'carol@example.com'),'Cartão 3', 'Viagem para o exterior', 300.00, 300.00, 'PAID', '2025-01-01');

-- Inserir parcelas de dívidas
INSERT INTO debt_installments (debt_id, installment_number, amount, paid_amount, due_date, status) VALUES
((SELECT id FROM debts WHERE user_id = (SELECT id FROM users WHERE email = 'alice@example.com')), 1, 250.00, 0.00, '2025-01-01', 'PENDING'),
((SELECT id FROM debts WHERE user_id = (SELECT id FROM users WHERE email = 'alice@example.com')), 2, 250.00, 0.00, '2025-02-01', 'PENDING'),
((SELECT id FROM debts WHERE user_id = (SELECT id FROM users WHERE email = 'bob@example.com')), 1, 500.00, 200.00, '2025-01-15', 'PENDING'),
((SELECT id FROM debts WHERE user_id = (SELECT id FROM users WHERE email = 'bob@example.com')), 2, 500.00, 0.00, '2025-03-01', 'PENDING'),
((SELECT id FROM debts WHERE user_id = (SELECT id FROM users WHERE email = 'carol@example.com')), 1, 300.00, 300.00, '2025-01-01', 'PAID');
