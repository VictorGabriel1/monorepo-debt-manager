import React, { useCallback } from "react";
import { ListBox } from "./styles";
import { Button } from "@mui/material";
import { DebtsEntity } from "@/@types/debts";
import api from "@/services/api";

export default function DebtList({
  debts,
  onEdit,
}: {
  debts: DebtsEntity[];
  onEdit: (debt: DebtsEntity) => void;
}) {
  const isOverdue = (debt: DebtsEntity) =>
    new Date(debt.dueDate) < new Date() && debt.status !== "PAID";

  const translateStatus = (status: string) => {
    switch (status) {
      case "PAID":
        return "Pago";
      case "PENDING":
        return "Pendente";
      case "OVERDUE":
        return "Atrasado";
      default:
        return "Desconhecido";
    }
  };

  async function handleDeleteDebt(debtId: string) {
    try {
      const response = await api.delete(`/debts/${debtId}`);
      console.log("Dívida cadastrada:", response.data);
      alert("Dívida exlcuída com sucesso!");
    } catch (error) {
      console.error("Erro excluir", error);
      alert("Erro ao excluir! Tente novamente.");
    }
  }

  return (
    <ListBox>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Valor Pago</th>
            <th>Data de Vencimento</th>
            <th>Status</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {debts.map((debt) => (
            <tr key={debt.id} className={isOverdue(debt) ? "overdue" : ""}>
              <td>{debt.title}</td>
              <td>R$ {debt.totalAmount}</td>
              <td>R$ {debt.paidAmount}</td>
              <td>{new Date(debt.dueDate).toLocaleDateString()}</td>
              <td>{translateStatus(debt.status)}</td>
              <td>{debt.description || "N/A"}</td>
              <td className="actions">
                <div>
                  <Button onClick={() => onEdit(debt)}>Editar</Button>
                  <Button
                    onClick={() => {
                      handleDeleteDebt(debt.id);
                    }}
                  >
                    Excluir
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ListBox>
  );
}
