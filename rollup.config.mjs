import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import autoprefixer from 'autoprefixer';
import merge from 'lodash.merge';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const entryFile = fileURLToPath(new URL('src/index.js', import.meta.url));
const outputFile = fileURLToPath(
  new URL(`dist/${pkg.name}.js`, import.meta.url)
);

const currentYear = new Date().getFullYear();
const releaseYear = 2017;
const bannerData = [
  `${pkg.name}`,
  `v${pkg.version}`,
  `${pkg.homepage}`,
  `(c) ${releaseYear}${currentYear === releaseYear ? '' : '-' + currentYear} ${
    pkg.author
  }`,
  `${pkg.license} license`,
];

// Plugins
const pluginSettings = {
  eslint: {
    exclude: ['node_modules/**', './package.json', '**.css'],
    throwOnWarning: false,
    throwOnError: true,
  },
  babel: {
    babelHelpers: 'bundled',
    exclude: ['node_modules/**'],
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          targets: 'last 2 versions, ie > 10',
        },
      ],
    ],
  },
  commonjs: {
    exclude: ['**.css'],
  },
  json: {},
  postcss: {
    inject: true,
    minimize: true,
    plugins: [autoprefixer()],
  },
  resolve: {
    moduleDirectories: ['node_modules'],
  },
  terser: {
    beautify: {
      compress: false,
      mangle: false,
      output: {
        beautify: true,
        comments: 'some',
      },
    },
    minify: {
      compress: true,
      mangle: true,
      output: {
        comments: new RegExp(pkg.name),
      },
    },
  },
};

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  strictDeprecations: true,
  input: entryFile,
  output: {
    file: outputFile,
    banner: `/*!\n * ${bannerData.join('\n * ')}\n */`,
    sourcemap: true,
  },
  plugins: [
    postcss(pluginSettings.postcss),
    resolve(pluginSettings.resolve),
    commonjs(pluginSettings.commonjs),
    json(pluginSettings.json),
    eslint(pluginSettings.eslint),
    babel(pluginSettings.babel),
  ],
  watch: {
    clearScreen: false,
  },
};

// IIFE
const iife = merge({}, config, {
  output: {
    format: 'iife',
  },
  plugins: config.plugins.concat([terser(pluginSettings.terser.beautify)]),
});

// IIFE (Minified)
const iifeMinified = merge({}, config, {
  output: {
    file: iife.output.file.replace(/\.js$/, '.min.js'),
    format: iife.output.format,
  },
  plugins: config.plugins.concat([terser(pluginSettings.terser.minify)]),
});

export default [iife, iifeMinified];
