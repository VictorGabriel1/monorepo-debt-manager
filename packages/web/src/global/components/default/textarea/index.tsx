"use client";

import React, { ForwardedRef, forwardRef } from "react";
import { CharCount, TextAreaContainer } from "./styles";
import { kMaxLength } from "buffer";

interface DefaultInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  length: number;
  maxLength: number;
  error?: string;
}

export default forwardRef(function DefaultTextArea(
  { label, error, maxLength, length, ...rest }: DefaultInputProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <TextAreaContainer>
      {label}
      <textarea maxLength={maxLength} ref={ref} {...rest} />
      {error && <span>{error}</span>}
      <CharCount>
        {length}/{maxLength}
      </CharCount>
    </TextAreaContainer>
  );
});
