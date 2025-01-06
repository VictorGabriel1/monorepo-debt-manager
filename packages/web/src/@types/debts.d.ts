import type { BaseEntity } from "./base";

export interface DebtsEntity extends BaseEntity {
  title: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: Date;
  status: "PENDING" | "PAID" | "LATE";
  description: string;
  installments: DebtInstallmentsEntity[];
}

export interface DebtInstallmentsEntity extends BaseEntity {
  installmentNumber: number;
  amount: number;
  paidAmount: number;
  dueDate: Date;
  status: "PENDENT" | "PAID" | "LATE";
  debt: DebtsEntity;
}
