/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXTAUTH_SECRET: "secret_key",
  },
};

export default nextConfig;
