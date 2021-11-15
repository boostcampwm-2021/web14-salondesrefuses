/** @type {import('next').NextConfig} */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    reactStrictMode: true,
    webpack(config) {
        return config;
    },
    env: {
        BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        API_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL,
        GOOGLE_AUTH_URL: process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL,
        KAKAO_AUTH_URL: process.env.NEXT_PUBLIC_KAKAO_AUTH_URL
    }
};
