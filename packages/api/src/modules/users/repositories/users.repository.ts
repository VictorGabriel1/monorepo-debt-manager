import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: DeepPartial<UsersEntity>): Promise<UsersEntity> {
    return await this.usersRepository.save(user);
  }

  async findById(id: string): Promise<UsersEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UsersEntity | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email "${email}" not found.`);
    }
    return user;
  }

  async update(
    id: string,
    userData: DeepPartial<UsersEntity>,
  ): Promise<UpdateResult> {
    await this.findById(id); // Check if the user exists
    return await this.usersRepository.update(id, userData);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Check if the user exists
    await this.usersRepository.delete(id);
  }
}
