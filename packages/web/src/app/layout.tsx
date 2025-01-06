import type { Metadata } from "next";
import App from "./app";
import Header from "@/global/components/header";

export const metadata: Metadata = {
  title: "Serasa",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <App>
      <Header />
      <main>{children}</main>
    </App>
  );
}