import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",       // static HTML export — required for GitHub Pages
  trailingSlash: true,    // /home → /home/ so file-based routing works on Pages
  images: { unoptimized: true }, // Next image optimization needs a server; Pages is static
  // basePath is injected by the GitHub Actions workflow from the repo name
  // (NEXT_PUBLIC_BASE_PATH env var). Locally it stays empty so dev still works.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export default nextConfig;
