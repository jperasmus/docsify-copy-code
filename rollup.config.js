// Dependencies
// =============================================================================
const path = require('path');

import autoprefixer from 'autoprefixer';
import merge       from 'lodash.merge';
import babel       from '@rollup/plugin-babel';
import commonjs    from '@rollup/plugin-commonjs';
import eslint      from '@rollup/plugin-eslint'
import json        from '@rollup/plugin-json'
import resolve     from '@rollup/plugin-node-resolve';
import postcss     from 'rollup-plugin-postcss';
import { terser }  from "rollup-plugin-terser";
import pkg         from './package.json';


// Settings
// =============================================================================
// Copyright
const currentYear = (new Date()).getFullYear();
const releaseYear = 2017;

// Output
const entryFile  = path.resolve(__dirname, 'src', 'index.js');
const outputFile = path.resolve(__dirname, 'dist', `${pkg.name}.js`);

// Banner
const bannerData = [
    `${pkg.name}`,
    `v${pkg.version}`,
    `${pkg.homepage}`,
    `(c) ${releaseYear}${currentYear === releaseYear ? '' : '-' + currentYear} ${pkg.author}`,
    `${pkg.license} license`
];

// Plugins
const pluginSettings = {
    eslint: {
        exclude: ['node_modules/**', './package.json', '**.css'],
        throwOnWarning: false,
        throwOnError: true
    },
    babel: {
        babelHelpers: 'bundled',
        exclude: ['node_modules/**'],
        presets: [
            [
                '@babel/env', {
                    modules: false,
                    targets: 'last 2 versions, ie > 10'
                }
            ]
        ]
    },
    json: {},
    postcss: {
        minimize: true,
        plugins: [
            autoprefixer()
        ]
    },
    terser: {
        beautify: {
            compress: false,
            mangle: false,
            output: {
                beautify: true,
                comments: 'some'
            }
        },
        minify: {
            compress: true,
            mangle: true,
            output: {
                comments: new RegExp(pkg.name)
            }
        }
    }
};


// Config
// =============================================================================
// Base
const config = {
    input : entryFile,
    output: {
        file: outputFile,
        banner: `/*!\n * ${bannerData.join('\n * ')}\n */`,
        sourcemap: true
    },
    plugins: [
        postcss(pluginSettings.postcss),
        resolve({
            moduleDirectories: ['node_modules']
        }),
        commonjs(),
        json(pluginSettings.json),
        eslint(pluginSettings.eslint),
        babel(pluginSettings.babel)
    ],
    watch: {
        clearScreen: false
    }
};

// Formats
// -----------------------------------------------------------------------------
// IIFE
const iife = merge({}, config, {
    output: {
        format: 'iife'
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.beautify)
    ])
});

// IIFE (Minified)
const iifeMinified = merge({}, config, {
    output: {
        file: iife.output.file.replace(/\.js$/, '.min.js'),
        format: iife.output.format
    },
    plugins: config.plugins.concat([
        terser(pluginSettings.terser.minify)
    ])
});


// Exports
// =============================================================================
export default [
    iife,
    iifeMinified
];
