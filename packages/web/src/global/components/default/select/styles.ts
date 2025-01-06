import styled from "styled-components";

export const SelectContainer = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 20px;
  select {
    height: 50px;
    padding: 0px 5px;
    border-radius: 10px;
    font-size: 15px;
    border: 2px solid #d4dae0;
    background-color: transparent;
    caret-color: #e80070;
    &:focus {
      border-color: #e80070;
      outline: none;
    }
  }
  span {
    position: absolute;
    bottom: -15px;
    font-size: 12.5px;
    color: #e80070;
  }
`;
