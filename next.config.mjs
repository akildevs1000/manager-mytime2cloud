/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  output: 'export'
};

const withPWAConfig = withPWA({
  dest: 'public',
  // Recommended: disable PWA in development
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);

export default withPWAConfig;