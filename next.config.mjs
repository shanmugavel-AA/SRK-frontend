/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: false,
    images: {
    // Add all external image domains you use (like Cloudinary or your API)
    domains: ['res.cloudinary.com', 'api.sharathravikumar.com'],
  },
};

export default nextConfig;
