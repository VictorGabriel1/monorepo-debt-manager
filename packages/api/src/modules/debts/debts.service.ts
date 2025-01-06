import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DebtsRepository } from './repositories/debts.repository';
import { DebtInstallmentsRepository } from './repositories/debt-installments.repository'; // Adicione a importação do repositório de parcelas
import { CreateDebtDto, UpdateDebtDto } from './dtos/debts.dto';
import { DebtsEntity } from './entities/debts.entity';
import { DebtInstallmentsEntity } from './entities/debt-installments.entity';
import {
  CreateDebtInstallmentDto,
  UpdateDebtInstallmentDto,
} from './dtos/debt-installments.dto';

@Injectable()
export class DebtsService {
  constructor(
    private readonly debtsRepository: DebtsRepository,
    private readonly debtInstallmentsRepository: DebtInstallmentsRepository, // Injete o repositório de parcelas
  ) {}

  async createDebtWithInstallments(
    createDebtDto: CreateDebtDto,
  ): Promise<DebtsEntity> {
    try {
      const { userId, ...debtData } = createDebtDto;

      // Criação da dívida associada ao usuário
      const debt = await this.debtsRepository.create(debtData, userId);

      // Gerar parcelas
      const { totalAmount, installments } = createDebtDto;
      const installmentAmount = +(totalAmount / installments.length).toFixed(2);

      // Criar as parcelas utilizando o repositório
      const debtInstallments = installments.map((installment, index) => {
        return {
          ...installment, // Inclui dados adicionais da parcela, se houver
          debt, // Associa a dívida a cada parcela
          installmentNumber: index + 1, // Ajuste do número da parcela
          amount: installmentAmount, // Valor da parcela calculado
        } as DebtInstallmentsEntity; // Altere para o tipo correto
      });

      // Chama o repositório para salvar as parcelas
      await this.debtInstallmentsRepository.createMany(debtInstallments);

      return debt;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDebtById(id: string) {
    const debt = await this.debtsRepository.findById(id);
    if (!debt) {
      throw new NotFoundException('Debt not found');
    }
    return debt;
  }

  async getDebtsByUserId(userId: string): Promise<DebtsEntity[]> {
    return await this.debtsRepository.findAllByUserId(userId);
  }

  async updateDebtAndAddInstallments(
    id: string,
    updateDebtDto: UpdateDebtDto,
  ): Promise<void> {
    try {
      const debt = await this.debtsRepository.findById(id);

      if (!debt) {
        throw new NotFoundException('Debt not found'); // Exceção NotFound
      }

      await this.debtsRepository.update(id, updateDebtDto);

      // Se necessário, adicionar novas parcelas
      if (
        updateDebtDto.installments &&
        updateDebtDto.installments.length > debt.installments.length
      ) {
        const newInstallmentsCount =
          updateDebtDto.installments.length - debt.installments.length;
        const installmentAmount = +(
          updateDebtDto.totalAmount / updateDebtDto.installments.length
        ).toFixed(2);

        // Adiciona novas parcelas ao final
        const newInstallments = [];

        for (
          let i = debt.installments.length + 1;
          i <= debt.installments.length + newInstallmentsCount;
          i++
        ) {
          console.log(`Adicionando parcela ${i}: Valor - ${installmentAmount}`);

          newInstallments.push({
            debt: debt, // Associa a dívida a cada nova parcela
            installmentNumber: i, // Número da parcela
            amount: installmentAmount, // Valor da parcela calculado
          } as Partial<DebtInstallmentsEntity>);
        }

        // Chama o repositório para salvar as novas parcelas
        if (newInstallments.length > 0) {
          await this.debtInstallmentsRepository.createMany(newInstallments);
        }
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException caso já tenha sido gerada
      }
      throw new BadRequestException(error.message); // Outros erros, lançar BadRequestException
    }
  }

  async deleteDebt(id: string): Promise<void> {
    const debt = await this.debtsRepository.findById(id);
    if (!debt) {
      throw new NotFoundException('Debt not found');
    }

    try {
      await this.debtsRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateInstallment(
    installmentId: string,
    updateDebtInstallmentDto: UpdateDebtInstallmentDto,
  ): Promise<void> {
    try {
      const installment =
        await this.debtInstallmentsRepository.findById(installmentId);
      if (!installment) {
        throw new NotFoundException('Installment not found');
      }
      await this.debtInstallmentsRepository.update(
        installmentId,
        updateDebtInstallmentDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteInstallment(installmentId: string): Promise<void> {
    try {
      const installment =
        await this.debtInstallmentsRepository.findById(installmentId);
      if (!installment) {
        throw new NotFoundException('Installment not found');
      }
      await this.debtInstallmentsRepository.delete(installmentId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
