/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  future: { webpack5: true },
  webpack: (config) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    return config
  },
  basePath: '/pdf',
  assetPrefix: '/pdf',  // 如果有静态资源
  trailingSlash: true,   // 可选，确保路径以斜杠结尾
};

export default nextConfig;
