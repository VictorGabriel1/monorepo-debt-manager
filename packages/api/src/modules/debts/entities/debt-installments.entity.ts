import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { DebtsEntity } from './debts.entity';
import { DebtStatus } from 'src/enums/debt-status.enum';

@Entity('debt_installments')
export class DebtInstallmentsEntity extends BaseEntity {
  @Column({ name: 'installment_number', type: 'int' })
  installmentNumber: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    name: 'paid_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  paidAmount: number;

  @Column({ name: 'due_date', type: 'date' })
  dueDate: Date;

  @Column({ type: 'enum', enum: DebtStatus, default: 'PENDING' })
  status: string;

  @JoinColumn({ name: 'debt_id' }) // Define explicitamente o nome da coluna
  @ManyToOne(() => DebtsEntity, (debt) => debt.installments)
  debt: DebtsEntity;
}
