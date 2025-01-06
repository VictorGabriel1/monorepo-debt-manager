"use client";

import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 7.5px;
  }

  ::-webkit-scrollbar-track {
    background: #610725;
  }

  ::-webkit-scrollbar-thumb {
    background: #e80070;
    border-radius: 7.5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #e80070;
  }

  ::-webkit-overflow-scrolling {
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    transition: 0.15s linear; // garente a animação de transição de cores em todos os lugares
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    &::selection {
      color: white;
      background: #e80070;
    }
  }

  html,
  body {
    height: 100vh;
    height: 100dvh;
    width: 100vw;
    color: #000826;
    font-weight: 400;
    background: #f5f7f9;
    overflow: hidden !important;
    overscroll-behavior-y: contain;
    scroll-behavior: smooth;
  }

  main {
    display: flex;
    height: calc(100vh - 60px);
    height: calc(100dvh - 60px);
    overflow: auto;
    z-index: 1;
  }

  input {
    color: #000826;
  }

  // todas as divs criadas já serão flex com sentido column por padrão
  div {
    display: flex;
    flex-direction: column;
  }

  // todos os botoes criadas já serão criados sem borda e com pointer ativo
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }

  a {
    min-height: 75%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    color: inherit;
    text-decoration: none;
  }

  mark {
    color: #e80070;
    background: none;
  }
`;

export const Container = styled.div`
  margin: auto;
  align-items: center;
  justify-content: center;
  display: flex;
  width: 100%;
  min-height: 100%;
  padding: 20px;
`;

export const RowContent = styled.div`
  flex-direction: row;
  font-weight: bold;
  text-align: left;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
`;

export const InteractiveLink = styled(Link)`
  span {
    color: #e80070;
  }
  &:hover {
    opacity: 0.75;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0px 9px 20px rgba(0, 0, 0, 0.1);
`;
