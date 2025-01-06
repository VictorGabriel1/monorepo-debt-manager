import { Container } from "@/global/styles/GlobalStyles";
import styled from "styled-components";

export const Content = styled(Container)`
  align-items: center;
  justify-content: center;
`;

export const LoginBox = styled.div`
  width: 90%;
  min-height: 500px;
  padding: 10px;
  max-width: 500px;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  border-radius: 20px;
  box-shadow: 0px 9px 20px rgba(0, 0, 0, 0.2);
`;
