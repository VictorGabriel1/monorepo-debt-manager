"use client";

import React from "react";
import { DefButton } from "./styles";

export interface DefaultButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export default function DefaultButton({
  selected,
  ...props
}: DefaultButtonProps) {
  return <DefButton {...props} />;
}
