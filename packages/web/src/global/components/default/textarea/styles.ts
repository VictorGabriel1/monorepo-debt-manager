import styled from "styled-components";

export const TextAreaContainer = styled.label`
  width: 90%;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 20px;
  textarea {
    min-height: 100px;
    max-height: 150px;
    padding: 0px 5px;
    border-radius: 10px;
    font-size: 15px;
    border: 2px solid #d4dae0;
    background-color: transparent;
    caret-color: #e80070;
    resize: vertical;
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

export const CharCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 10px;
  font-size: 12.5px;
  color: #000;
`;
