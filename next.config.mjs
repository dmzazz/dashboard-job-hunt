/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kadbktwwsmhmqzpvnbxm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
