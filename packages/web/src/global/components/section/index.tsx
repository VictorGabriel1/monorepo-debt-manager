// src/components/Section.js
import React from "react";
import PropTypes from "prop-types";
import { SectionContainer, SectionItem, SectionTitle } from "./styles";

export default function Section({
  title,
  items,
}: {
  title: string;
  items: any[];
}) {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <SectionItem key={index}>{item}</SectionItem>
        ))
      ) : (
        <SectionItem>Sem informações disponíveis</SectionItem>
      )}
    </SectionContainer>
  );
}
