"use client";

import React, { ForwardedRef, forwardRef } from "react";
import { InputContainer } from "./styles";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default forwardRef(function DefaultInput(
  { label, error, ...rest }: DefaultInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <InputContainer>
      {label}
      <input ref={ref} {...rest} />
      {error && <span>{error}</span>}
    </InputContainer>
  );
});
