/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/pulsenexis-download",
        destination: "/trademark",
        permanent: true, // 308 redirect (good for SEO)
      },
      // Optional: also catch trailing slash
      {
        source: "/pulsenexis-download/",
        destination: "/trademark",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;