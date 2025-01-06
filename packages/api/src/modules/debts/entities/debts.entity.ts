import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { UsersEntity } from 'src/modules/users/entities/users.entity';
import { DebtInstallmentsEntity } from './debt-installments.entity';
import { DebtStatus } from 'src/enums/debt-status.enum';

@Entity('debts')
export class DebtsEntity extends BaseEntity {
  @Column()
  description: string;

  @Column()
  title: string;

  @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

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

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => UsersEntity, (user) => user.debts)
  user: UsersEntity;

  @OneToMany(() => DebtInstallmentsEntity, (installment) => installment.debt, {
    eager: true,
    cascade: true,
  })
  installments: DebtInstallmentsEntity[];
}
