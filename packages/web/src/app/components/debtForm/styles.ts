import { RowContent } from "@/global/styles/GlobalStyles";
import { styled } from "styled-components";

export const DebtBox = styled.div`
  display: flex;
  width: 100%;
  flex: 3;
  max-width: 500px;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
  border-radius: 15px;
  box-shadow: 0px 9px 20px rgba(0, 0, 0, 0.2);
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 12.5px;
  }
`;

export const ButtonWrapper = styled(RowContent)`
  justify-content: center;
  button {
    width: 45%;
  }
`;
