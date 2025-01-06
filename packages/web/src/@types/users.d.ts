import type { BaseEntity } from "./base";

export interface UsersEntity extends BaseEntity {
  name: string;
  email: string;
  cpf: string;
  birthdate: string;
  debts: DebtsEntity[];
}
