/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    webpack(config) {
        return config;
    },
    experimental: {
        concurrentFeatures: true,
    },
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        API_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL,
        GOOGLE_AUTH_URL: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL,
        KAKAO_AUTH_URL: process.env.NEXT_PUBLIC_KAKAO_AUTH_URL,
        ETHEREUM_HOST: process.env.NEXT_PUBLIC_ETHEREUM_HOST,
    },
    images: {
        domains: ['salon-bucket.kr.object.ncloudstorage.com'],
    },
};
