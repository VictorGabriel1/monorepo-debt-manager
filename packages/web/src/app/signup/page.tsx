// pages/signup.tsx

"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultButton from "@/global/components/default/button";
import DefaultInput from "@/global/components/default/input";
import { Content, SignUpBox } from "./styles";
import Link from "next/link";
import * as yup from "yup";
import api from "@/services/api";
import { InteractiveLink } from "@/global/styles/GlobalStyles";

export const DoctorValidationSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório!"),
  email: yup
    .string()
    .email("Insira um e-mail válido!")
    .required("Campo obrigatório!"),
  password: yup
    .string()
    .min(8, "Minimo 8 caracteres!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/,
      "A senha deve conter: 1 letra minuscula, 1 maiscula, 1 numero e 1 caracter especial"
    )
    .required("Campo obrigatorio!"),
  passwordConfirm: yup
    .string()
    .min(8, "Minimo 8 caracteres!")
    .required("Campo obrigatorio!")
    .oneOf([yup.ref("password")], "As senhas não são iguais!"),
  cpf: yup
    .string()
    .matches(/\d+$/g, "CPF ínvalido!")
    .length(11, "CPF ínvalido!")
    .required("Campo obrigatório!"),
  birthdate: yup
    .date()
    .nullable()
    .transform((curr, orig) => (orig === "" ? null : curr))
    .required("Campo obrigatório!"),
});

type SignUpSchema = yup.InferType<typeof DoctorValidationSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DoctorValidationSchema),
    mode: "onSubmit",
  });

  async function handleSignUp(data: SignUpSchema) {
    const { passwordConfirm, ...form } = data;
    await api
      .post("/users", form)
      .then((res) => {
        console.log(res);
        window.location.href = "/signin";
      })
      .catch((e) => {
        if (
          Object.values(e.response.data)[0] ===
          'duplicate key value violates unique constraint "users_email_key"'
        ) {
          alert("E-mail já cadastrado!");
        } else if (
          Object.values(e.response.data)[0] ===
          'duplicate key value violates unique constraint "users_cpf_key"'
        ) {
          alert("CPF já cadastrado!");
        }
        console.log(
          "error: " + Object.values(e.response.data).toLocaleString()
        );
      });
  }

  return (
    <Content>
      <SignUpBox>
        <form>
          <DefaultInput
            label="Nome"
            error={errors.name?.message}
            placeholder="Fulano de Tal"
            {...register("name")}
          />
          <DefaultInput
            label="E-mail"
            type="email"
            placeholder="exemplo@exemplo.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <DefaultInput
            label="Senha"
            type="password"
            placeholder="Insira sua senha"
            error={errors.password?.message}
            {...register("password")}
          />
          <DefaultInput
            label="Confirme sua Senha"
            placeholder="Confirme sua senha"
            type="password"
            error={errors.passwordConfirm?.message}
            {...register("passwordConfirm")}
          />
          <DefaultInput
            label="CPF"
            type="text"
            maxLength={11}
            placeholder="XXXXXXXXXXX"
            error={errors.cpf?.message}
            {...register("cpf")}
          />
          <DefaultInput
            label="Nascimento"
            error={errors.birthdate?.message}
            type="date"
            {...register("birthdate")}
          />
        </form>
        <DefaultButton onClick={handleSubmit(handleSignUp)}>
          Cadastrar
        </DefaultButton>
        <InteractiveLink href="/signin">
          Já tem uma conta? <span>Faça login</span>
        </InteractiveLink>
      </SignUpBox>
    </Content>
  );
}
