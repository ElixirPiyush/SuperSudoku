/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so the site deploys to Firebase Hosting (no Node server).
  output: "export",
  // Each route exports as /route/index.html -> maps cleanly onto Firebase Hosting.
  trailingSlash: true,
  // next/image optimization requires a server; disable for static export.
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
