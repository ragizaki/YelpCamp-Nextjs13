/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/*",
      },
      {
        protocol: "https",
        hostname: "upcdn.io",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
