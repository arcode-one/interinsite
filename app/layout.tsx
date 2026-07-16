import type { Metadata } from "next";
import "./globals.css";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGitHubPagesBuild =
  process.env.PAGES_BUILD === "true" &&
  process.env.GITHUB_ACTIONS === "true";
const isUserOrOrganizationSite = repositoryName?.endsWith(".github.io");
const basePath =
  isGitHubPagesBuild && repositoryName && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : "";

export const metadata: Metadata = {
  title: "INTER INSITE — AI & автоматизация для бизнеса",
  description:
    "Разработка ИИ-агентов, программного обеспечения, встраиваемых систем и облачной инфраструктуры.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
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
