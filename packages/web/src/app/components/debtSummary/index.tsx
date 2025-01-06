"use client";

import { DebtsEntity } from "@/@types/debts";
import { RowContent } from "@/global/styles/GlobalStyles";
import React from "react";
import { ValueBox } from "./styles";

export default function DebtSummary({ debts }: { debts: DebtsEntity[] }) {
  const totalDebts = debts.length;

  // Soma dos valores pendentes (garante que o valor seja tratado como número)
  const totalPending = debts
    .filter((debt) => debt.status === "PENDING")
    .reduce((sum, debt) => sum + parseFloat(debt.totalAmount.toString()), 0); // Converte totalAmount para número

  // Soma dos valores pagos (garante que o valor seja tratado como número)
  const totalPaid = debts
    .filter((debt) => debt.status === "PAID")
    .reduce((sum, debt) => sum + parseFloat(debt.paidAmount.toString()), 0); // Converte paidAmount para número

  return (
    <RowContent>
      <ValueBox>Total de Dívidas: {totalDebts}</ValueBox>
      <ValueBox>Valor Total Pendente: R$ {totalPending - totalPaid}</ValueBox>
      <ValueBox>Valor Total Pago: R$ {totalPaid.toFixed(2)}</ValueBox>
    </RowContent>
  );
}
