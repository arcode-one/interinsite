import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INTER INSITE — AI & автоматизация для бизнеса",
  description:
    "Разработка ИИ-агентов, программного обеспечения, встраиваемых систем и облачной инфраструктуры.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
