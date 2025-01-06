import { Container } from "@/global/styles/GlobalStyles";
import Link from "next/link";
import styled from "styled-components";

export const Content = styled(Container)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 100px;
`;

export const Box = styled.div`
  flex-wrap: wrap;
  flex-direction: row;
  gap: 200px;
`;

export const LoadingAnimation = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  div {
    width: 80px;
    height: 80px;
    position: relative;
    position: inline-block;
  }

  span {
    position: absolute;
    width: 6px;
    height: 6px;
    background: #e80070;
    border-radius: 50%;
    animation: lds-default 1.2s linear infinite;
  }
  span:nth-child(1) {
    animation-delay: 0s;
    top: 37px;
    left: 66px;
  }
  span:nth-child(2) {
    animation-delay: -0.1s;
    top: 22px;
    left: 62px;
  }
  span:nth-child(3) {
    animation-delay: -0.2s;
    top: 11px;
    left: 52px;
  }
  span:nth-child(4) {
    animation-delay: -0.3s;
    top: 7px;
    left: 37px;
  }
  span:nth-child(5) {
    animation-delay: -0.4s;
    top: 11px;
    left: 22px;
  }
  span:nth-child(6) {
    animation-delay: -0.5s;
    top: 22px;
    left: 11px;
  }
  span:nth-child(7) {
    animation-delay: -0.6s;
    top: 37px;
    left: 7px;
  }
  span:nth-child(8) {
    animation-delay: -0.7s;
    top: 52px;
    left: 11px;
  }
  span:nth-child(9) {
    animation-delay: -0.8s;
    top: 62px;
    left: 22px;
  }
  span:nth-child(10) {
    animation-delay: -0.9s;
    top: 66px;
    left: 37px;
  }
  span:nth-child(11) {
    animation-delay: -1s;
    top: 62px;
    left: 52px;
  }
  span:nth-child(12) {
    animation-delay: -1.1s;
    top: 52px;
    left: 62px;
  }
  @keyframes lds-default {
    0%,
    20%,
    80%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
  }
`;
