import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DebtsController } from './debts.controller';
import { DebtsService } from './debts.service';
import { DebtsRepository } from './repositories/debts.repository';
import { DebtsEntity } from './entities/debts.entity';
import { DebtInstallmentsEntity } from './entities/debt-installments.entity';
import { DebtInstallmentsRepository } from './repositories/debt-installments.repository';
import { UsersEntity } from '../users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DebtsEntity,
      DebtInstallmentsEntity,
      UsersEntity,
    ]),
  ],
  providers: [DebtsRepository, DebtInstallmentsRepository, DebtsService],
  controllers: [DebtsController],
  exports: [DebtsRepository],
})
export class DebtsModule {}
