// Dependencies
// =============================================================================
const browserSync = require('browser-sync').create();
const compression = require('compression');

browserSync.init({
    files: [
        './demo/',
        './dist/',
        './README.md'
    ],
    ghostMode: {
        clicks: false,
        forms : false,
        scroll: false
    },
    open: false,
    notify: false,
    server: {
        baseDir: [
            './demo/'
        ],
        middleware: [
            compression()
        ],
        routes: {
            '/dist/'    : './dist',
            '/README.md': './README.md'
        }
    }
});
