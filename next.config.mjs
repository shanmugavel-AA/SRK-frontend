/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    images: {
    domains: ['res.cloudinary.com', 'api.sharathravikumar.com'],
  },
};

export default nextConfig;
