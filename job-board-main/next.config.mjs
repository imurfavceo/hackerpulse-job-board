const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'v5.airtableusercontent.com',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;
  