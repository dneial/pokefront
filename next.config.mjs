/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/PokeAPI/sprites/**",
      },
      {
        protocol: "https",
        hostname: "images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
