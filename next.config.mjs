/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.imgur.com'],
    },
    async rewrites() {
        return [
            process.env.NODE_ENV === 'production' ? {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*',
            } : {
                source: '/api/:path*',
                destination: 'http://localhost:5000/api/:path*'
            },
        ];
    },
};

export default nextConfig;
