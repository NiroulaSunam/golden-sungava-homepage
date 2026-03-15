import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: "standalone",

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
      },
      {
        // Local Supabase development (default port)
        protocol: "http",
        hostname: "localhost",
        port: "54321",
      },
      {
        // Local Supabase development (custom port for this project)
        protocol: "http",
        hostname: "localhost",
        port: "54521",
      },
      {
        // Local Supabase development (alternative hostname)
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54321",
      },
      {
        // Local Supabase development (alternative hostname, custom port)
        protocol: "http",
        hostname: "127.0.0.1",
        port: "54521",
      },
      {
        // Google Drive images
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        // S3 veda-app (school media)
        protocol: "https",
        hostname: "s3.veda-app.com",
      },
      {
        // S3 veda-app legacy (school media)
        protocol: "https",
        hostname: "veda-app.s3.ap-south-1.amazonaws.com",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
