import { Container } from "@/global/styles/GlobalStyles";
import styled from "styled-components";

export const Content = styled(Container)`
  align-items: center;
  justify-content: center;
`;

export const SignUpBox = styled.div`
  width: 90%;
  min-height: 500px;
  padding: 10px;
  max-width: 500px;
  align-items: center;
  justify-content: space-around;
  gap: 15px;
  border-radius: 20px;
  box-shadow: 0px 9px 20px rgba(0, 0, 0, 0.15);
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 12.5px;
  }
`;
