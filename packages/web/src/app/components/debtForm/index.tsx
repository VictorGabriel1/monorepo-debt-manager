"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultButton from "@/global/components/default/button";
import DefaultInput from "@/global/components/default/input";
import DefaultTextArea from "@/global/components/default/textarea";
import DefaultSelect from "@/global/components/default/select"; // Supondo que você tenha um componente de select
import api from "@/services/api";
import * as yup from "yup";
import { ButtonWrapper, DebtBox } from "./styles";
import { useSession } from "next-auth/react";
import { DebtsEntity } from "@/@types/debts";
import { RowContent } from "@/global/styles/GlobalStyles";

export const DebtValidationSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório!"),
  totalAmount: yup
    .number()
    .typeError("Insira um valor válido!")
    .positive("O valor deve ser positivo!")
    .required("Campo obrigatório!"),
  paidAmount: yup
    .number()
    .typeError("Insira um valor válido!")
    .min(0, "O valor deve ser positivo!")
    .required("Campo obrigatório!")
    .default(0),
  dueDate: yup
    .date()
    .typeError("Insira uma data válida!")
    .required("Campo obrigatório!"),
  status: yup
    .string()
    .oneOf(["PENDING", "PAID", "LATE"], "Selecione um status válido!")
    .required("Campo obrigatório!"),
  description: yup.string().optional(),
});

type DebtFormSchema = yup.InferType<typeof DebtValidationSchema>;

export default function DebtForm({
  editDebt,
  handleChangeEditDebt,
}: {
  editDebt?: DebtsEntity;
  handleChangeEditDebt: (debt?: DebtsEntity) => void;
}) {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DebtValidationSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (editDebt) {
      reset({
        title: editDebt.title || "",
        totalAmount: editDebt.totalAmount || 0,
        paidAmount: editDebt.paidAmount || 0,
        dueDate: editDebt.dueDate || undefined,
        status: editDebt.status || "PENDING",
        description: editDebt.description || "",
      });
    } else {
      reset({
        title: "",
        totalAmount: 0,
        paidAmount: 0,
        dueDate: undefined,
        status: "PENDING",
        description: "",
      });
    }
  }, [editDebt, reset]);

  async function handleAddDebt(data: DebtFormSchema) {
    try {
      const response = await api.post("/debts", {
        ...data,
        userId: session?.user?.id,
        installments: [],
      });
      console.log("Dívida cadastrada:", response.data);
      alert("Dívida cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar dívida:", error);
      alert("Erro ao cadastrar dívida! Tente novamente.");
    }
  }

  async function handleEditDebt(debtId: string, data: DebtFormSchema) {
    try {
      const response = await api.patch(`/debts/${debtId}`, {
        ...data,
      });
      console.log("Dívida cadastrada:", response.data);
      alert("Dívida editada com sucesso!");
    } catch (error) {
      console.error("Erro ao editar dívida:", error);
      alert("Erro ao editar dívida! Tente novamente.");
    }
  }

  return (
    <DebtBox>
      <form>
        <DefaultInput
          label="Título"
          placeholder="Cartão de Crédito"
          error={errors.title?.message}
          {...register("title")}
        />
        <DefaultInput
          label="Valor"
          type="number"
          placeholder="Ex.: 1200.50"
          error={errors.totalAmount?.message}
          {...register("totalAmount")}
        />
        <DefaultInput
          label="Valor Pago"
          type="number"
          placeholder="Ex.: 120.50"
          error={errors.paidAmount?.message}
          {...register("paidAmount")}
        />
        <DefaultInput
          label="Data de Vencimento"
          type="date"
          error={errors.dueDate?.message}
          {...register("dueDate")}
        />
        <DefaultSelect
          label="Status"
          options={[
            { value: "PENDING", label: "Pendente" },
            { value: "PAID", label: "Pago" },
            { value: "LATE", label: "Atrasado" },
          ]}
          error={errors.status?.message}
          {...register("status")}
        />
        <DefaultTextArea
          length={watch("description")?.length || 0}
          maxLength={100}
          label="Observações"
          placeholder="Notas sobre a dívida (opcional)"
          error={errors.description?.message}
          {...register("description")}
        />
      </form>
      <ButtonWrapper>
        <DefaultButton
          onClick={handleSubmit((data) =>
            editDebt ? handleEditDebt(editDebt.id, data) : handleAddDebt(data)
          )}
        >
          {editDebt ? "Editar" : "Cadastrar"} Dívida
        </DefaultButton>
        {editDebt && (
          <DefaultButton onClick={() => handleChangeEditDebt(undefined)}>
            Cancelar Edição
          </DefaultButton>
        )}
      </ButtonWrapper>
    </DebtBox>
  );
}
