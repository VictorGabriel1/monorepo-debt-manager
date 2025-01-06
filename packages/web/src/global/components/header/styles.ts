"use client";

import styled from "styled-components";

export const HeaderContent = styled.header`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: #e80070;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  span {
    color: white;
    font-size: 30px;
  }
`;
