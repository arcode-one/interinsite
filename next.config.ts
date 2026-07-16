import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isPagesBuild = process.env.PAGES_BUILD === "true";
const isGitHubPagesBuild =
  isPagesBuild && process.env.GITHUB_ACTIONS === "true";
const isUserOrOrganizationSite = repositoryName?.endsWith(".github.io");
const basePath =
  isGitHubPagesBuild && repositoryName && !isUserOrOrganizationSite
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  ...(isPagesBuild
    ? {
        output: "export",
        trailingSlash: true,
        basePath,
        typescript: {
          tsconfigPath: "tsconfig.pages.json",
        },
      }
    : {}),
};

export default nextConfig;
