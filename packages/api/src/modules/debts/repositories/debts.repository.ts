import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, UpdateResult } from 'typeorm';
import { DebtsEntity } from '../entities/debts.entity';
import { UsersEntity } from 'src/modules/users/entities/users.entity';

@Injectable()
export class DebtsRepository {
  constructor(
    @InjectRepository(DebtsEntity)
    private readonly debtsRepository: Repository<DebtsEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(
    debt: DeepPartial<DebtsEntity>,
    userId: string,
  ): Promise<DebtsEntity> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }

    // Associar o usuário à dívida
    const newDebt = this.debtsRepository.create({ ...debt, user });
    return await this.debtsRepository.save(newDebt);
  }

  async findById(id: string): Promise<DebtsEntity> {
    const debt = await this.debtsRepository.findOne({ where: { id } });
    if (!debt) {
      throw new NotFoundException(`Debt with ID "${id}" not found.`);
    }
    return debt;
  }

  async findAllByUserId(userId: string): Promise<DebtsEntity[]> {
    return await this.debtsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: string,
    debtData: DeepPartial<DebtsEntity>,
  ): Promise<UpdateResult> {
    await this.findById(id); // Ensure the debt exists
    return await this.debtsRepository.update(id, debtData);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Ensure the debt exists
    await this.debtsRepository.delete(id);
  }
}
