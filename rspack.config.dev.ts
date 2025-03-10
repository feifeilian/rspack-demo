import path from 'path';
import fs from 'fs';
import {defineConfig} from '@rspack/cli';
import {rspack} from '@rspack/core';
import {RsdoctorRspackPlugin} from '@rsdoctor/rspack-plugin';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

const STAGE = process.env.STAGE;

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

export default (async () => {

    return defineConfig({
        mode: 'development',
        devtool: 'source-map',
        output: {
            publicPath: '/',
        },
        entry: {
            'welcome': './src/entries/welcome.js',
            'login': './src/entries/login.js',
        },
        // entry: './src/entries/index.js',
        resolve: {
            extensions: ['...', '.ts', '.tsx', '.jsx', '.js', '.json', '.mjs'],
            alias: {
                '@': resolveApp('src'),
            },
        },
        module: {
            rules: [
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    type: 'asset',
                },
                {
                    test: /\.(jsx?|tsx?)$/,
                    resolve: {fullySpecified: false},
                    use: [
                        {
                            loader: 'builtin:swc-loader',
                            options: {
                                jsc: {
                                    parser: {
                                        syntax: 'typescript',
                                        tsx: true,
                                    },
                                    transform: {
                                        react: {
                                            runtime: 'automatic',
                                            development: true,
                                            refresh: false,
                                        },
                                    },
                                },
                                env: {targets},
                            },
                        },
                    ],
                },
                {
                    test: [/\.less$/],
                    use: [
                        {
                            loader: 'less-loader',
                            options: {lessOptions: {math: 'always'}},
                        },
                    ],
                    type: 'css',
                },
                {
                    test: /\.svg$/,
                    resourceQuery: {
                        not: /^\?raw|url$/,
                    },
                    oneOf: [
                        {
                            // 如果挂了`?react`的，就直接转成组件返回
                            resourceQuery: /^\?react$/,
                            use: ['@svgr/webpack'],
                        },
                        {
                            resourceQuery: {
                                not: /^\?react$/,
                            },
                            type: 'asset',
                        },
                    ],
                },
            ],
        },
        plugins: [
            new rspack.DefinePlugin({
                'process.env.STAGE': JSON.stringify(STAGE),
            }),
            process.env.RSDOCTOR && new RsdoctorRspackPlugin({}),
            // new rspack.HtmlRspackPlugin({
            //     template: './src/entries/index.ejs',
            // }),
            new rspack.HtmlRspackPlugin({
                filename: 'welcome.html',
                chunks: ['welcome'],
                minify: false,
                template: './src/entries/welcome.ejs',
            }),
            new rspack.HtmlRspackPlugin({
                filename: 'login.html',
                chunks: ['login'],
                minify: false,
                template: './src/entries/login.ejs',
            }),
        ],
        experiments: {
            css: true,
        },
    });
})();
