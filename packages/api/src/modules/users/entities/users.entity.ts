import { Entity, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/modules/shared/entities/base.entity';
import { DebtsEntity } from 'src/modules/debts/entities/debts.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ length: 11 })
  cpf: string;

  @Column()
  birthdate: Date;

  @OneToMany(() => DebtsEntity, (debts) => debts.user, {
    eager: true,
    cascade: true,
  })
  debts?: DebtsEntity[];
}
