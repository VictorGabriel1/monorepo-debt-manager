"use client";

import { Box, Content } from "./styles";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DefaultButton from "@/global/components/default/button";
import { signOut, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import api from "@/services/api";
import Loading from "./loading";
import { AxiosResponse } from "axios";
import { DebtsEntity } from "@/@types/debts";
import { UsersEntity } from "@/@types/users";
import { RowContent } from "@/global/styles/GlobalStyles";
import DebtForm from "./components/debtForm";
import DebtSummary from "./components/debtSummary";
import DebtList from "./components/debtList";

export default function Home() {
  const { data: session } = useSession();

  const [debts, setDebts] = useState<DebtsEntity[]>([]);
  const [editDebt, setEditDebt] = useState<DebtsEntity>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = session?.user?.email;
    console.log(session?.user?.id);
    if (email) {
      api
        .get(`/users/email/${email}`)
        .then((response: AxiosResponse<UsersEntity>) => {
          console.log(response.data);
          setLoading(false);
          setDebts(response.data.debts);
        })
        .catch((err) => {
          alert("Algo deu errado! Tente novamente mais tarde.");
          signOut({ callbackUrl: "/signin" });
        });
    }
  }, [session]);

  const handlChangeEditDebt = useCallback(
    async function (debt?: DebtsEntity) {
      setEditDebt(debt);
    },
    [editDebt, setEditDebt]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Content>
      <RowContent>
        <DebtSummary debts={debts} />
        <DebtForm
          handleChangeEditDebt={handlChangeEditDebt}
          editDebt={editDebt}
        />
        <DebtList debts={debts} onEdit={handlChangeEditDebt} />
      </RowContent>
      {/* <DefaultButton onClick={() => signOut({ callbackUrl: "/signin" })}>
        Desconectar
      </DefaultButton> */}
    </Content>
  );
}
