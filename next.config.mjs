/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/coinmarketcap/:slug*',
                destination: `/api/coinmarketcap/:slug*`,
            }
        ]
    }
};

export default nextConfig;
