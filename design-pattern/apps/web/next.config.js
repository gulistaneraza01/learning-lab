const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Same-origin proxy to the Express backend, so no CORS setup is needed.
  rewrites() {
    return [{ source: "/api/:path*", destination: `${backendUrl}/:path*` }];
  },
};

export default nextConfig;
