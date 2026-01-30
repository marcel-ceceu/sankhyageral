/**
 * BUILD SCRIPT - a305-MenuGeralAPESP
 * Gera HTML único com CSS e JS inline
 *
 * Uso: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const CSS_FILES = [
    '_core/css/variables.css',
    '_core/css/base.css',
    '_core/css/layout.css',
    '_core/css/buttons.css',
    '_core/css/modal.css',
    'css/custom.css'
];

const JS_FILES = [
    '_core/js/utils.js',
    'js/config.js',
    'js/main.js'
];

function readFile(filePath) {
    return fs.readFileSync(path.join(ROOT, filePath), 'utf8');
}

function concatenateFiles(files) {
    return files.map(file => {
        console.log('  + ' + file);
        return readFile(file);
    }).join('\n\n');
}

function build() {
    console.log('========================================');
    console.log('BUILD: a305-MenuGeralAPESP');
    console.log('========================================\n');

    let html = readFile('index.html');

    console.log('CSS:');
    const css = concatenateFiles(CSS_FILES);

    console.log('\nJS:');
    const js = concatenateFiles(JS_FILES);

    html = html.replace(/<link rel="stylesheet" href="[^"]+\.css">\s*/g, '');
    html = html.replace(/<script src="(?!https:\/\/)[^"]+\.js"><\/script>\s*/g, '');

    html = html.replace('</head>', `    <style>\n${css}\n    </style>\n</head>`);
    html = html.replace('</body>', `    <script>\n${js}\n    </script>\n</body>`);

    if (!fs.existsSync(DIST)) {
        fs.mkdirSync(DIST, { recursive: true });
    }

    const outputPath = path.join(DIST, 'a305-MenuGeralAPESP.html');
    fs.writeFileSync(outputPath, html, 'utf8');

    const stats = fs.statSync(outputPath);
    const sizeKB = Math.round(stats.size / 1024);

    console.log('\n========================================');
    console.log('BUILD COMPLETO!');
    console.log('========================================');
    console.log('Arquivo: dist/a305-MenuGeralAPESP.html');
    console.log('Tamanho: ' + sizeKB + ' KB');
    console.log('========================================\n');
}

build();
