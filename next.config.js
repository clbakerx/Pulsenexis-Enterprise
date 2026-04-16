const nextConfig = {
  async redirects() {
    return [
      {
        source: "/pulsenexis-download",
        destination: "/trademark",
        permanent: true,
      },
      {
        source: "/pulsenexis-download/",
        destination: "/trademark",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;