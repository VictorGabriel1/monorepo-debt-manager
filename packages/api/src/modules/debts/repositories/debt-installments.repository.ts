import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DebtInstallmentsEntity } from '../entities/debt-installments.entity';
import { UpdateDebtInstallmentDto } from '../dtos/debt-installments.dto';

@Injectable()
export class DebtInstallmentsRepository {
  constructor(
    @InjectRepository(DebtInstallmentsEntity)
    private readonly installmentsRepository: Repository<DebtInstallmentsEntity>,
  ) {}

  async createMany(
    installments: Partial<DebtInstallmentsEntity[]>,
  ): Promise<DebtInstallmentsEntity[]> {
    return await this.installmentsRepository.save(installments);
  }

  async update(
    id: string,
    updateDebtInstallmentDto: UpdateDebtInstallmentDto,
  ): Promise<DebtInstallmentsEntity> {
    // Buscar a parcela por ID
    const installment = await this.installmentsRepository.findOne({
      where: { id },
    });

    if (!installment) {
      throw new NotFoundException(`Installment with ID "${id}" not found.`);
    }

    // Atualizar a parcela
    await this.installmentsRepository.update(id, updateDebtInstallmentDto);

    // Retornar a parcela atualizada
    return await this.installmentsRepository.findOne({ where: { id } });
  }

  // Método para excluir uma parcela
  async delete(id: string): Promise<void> {
    // Verificar se a parcela existe antes de excluir
    const installment = await this.installmentsRepository.findOne({
      where: { id },
    });

    if (!installment) {
      throw new NotFoundException(`Installment with ID "${id}" not found.`);
    }

    // Excluir a parcela
    await this.installmentsRepository.delete(id);
  }

  async findByDebtId(debtId: string): Promise<DebtInstallmentsEntity[]> {
    return await this.installmentsRepository.find({
      where: { debt: { id: debtId } },
    });
  }

  // Método para buscar uma parcela específica pelo ID
  async findById(id: string): Promise<DebtInstallmentsEntity | undefined> {
    return await this.installmentsRepository.findOne({ where: { id } });
  }
}
