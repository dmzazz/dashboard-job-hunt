/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ewhwqczwexoubwnwbuyi.supabase.co",
      },
    ],
  },
};

export default nextConfig;
