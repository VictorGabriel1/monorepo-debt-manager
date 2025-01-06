"use client";

import StyledComponentsRegistry from "@/lib/StyledComponetsRegistry";
import { GlobalStyle } from "@/global/styles/GlobalStyles";
import { SessionProvider } from "next-auth/react";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <SessionProvider>
        <GlobalStyle />
        <html lang="pt-BR">
          <body>{children}</body>
        </html>
      </SessionProvider>
    </StyledComponentsRegistry>
  );
}
