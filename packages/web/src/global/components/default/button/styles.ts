import styled from "styled-components";
import { DefaultButtonProps } from ".";

export const DefButton = styled.button<DefaultButtonProps>`
  height: 40px;
  width: 50%;
  min-width: 150px;
  max-width: 300px;
  font-size: 20px;
  font-weight: 500;
  background-color: ${(props) => (props.disabled ? "grey" : "#e80070")};
  /* border: 2px solid ${({ theme }) => theme.default}; */
  border-radius: 10px;
  color: white;
  &:hover {
    opacity: 0.75;
  }
`;
