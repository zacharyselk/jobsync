/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
  trustHost: true,
  // Add trailing slash configuration
  trailingSlash: false,
  // Ensure proper handling of rewrites
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/signin',
          destination: '/signin',
        },
      ],
    };
  },
};

export default nextConfig;
