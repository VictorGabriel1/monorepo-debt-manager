"use client";

import React, { ForwardedRef, forwardRef } from "react";
import { SelectContainer } from "./styles";

interface DefaultSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
}

export default forwardRef(function DefaultSelect(
  { label, error, options, ...rest }: DefaultSelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <SelectContainer>
      {label}
      <select ref={ref} {...rest}>
        {options.map((item, index) => (
          <option key={`debt-status-option-${index}`} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </SelectContainer>
  );
});
