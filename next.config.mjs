/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/coinmarketcap/:slug*',
                destination: `/api/coinmarketcap/:slug*`,
            },
            {
                source: '/coinmarketcap50/:slug*',
                destination: `/api/coinmarketcap50/:slug*`,
            },
            {
                source: '/coinmarketcap100/:slug*',
                destination: `/api/coinmarketcap100/:slug*`,
            },
        ]
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

export default nextConfig;
