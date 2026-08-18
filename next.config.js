/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.ieee.org" },
      { protocol: "https", hostname: "**.vtools.ieee.org" },
      { protocol: "https", hostname: "**" }
    ]
  }
};

module.exports = nextConfig;
