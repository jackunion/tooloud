const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        filename: 'tooloud.min.js',
        library: 'tooloud',
        libraryExport: 'default',
        libraryTarget: 'umd',
        path: path.resolve(__dirname, 'dist')
    }
};
