/** @type {import('next').NextConfig} */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    reactStrictMode: true,
    webpack(config) {
        return config;
    },
};
