const fs = require('fs');
const path = require('path');

const root = __dirname;
const srcIndex = path.join(root, 'index.jsp');
const srcCss = path.join(root, 'css', 'app.css');
const srcJs = path.join(root, 'js', 'app.js');
const distDir = path.join(root, 'dist');
const distIndex = path.join(distDir, 'index.jsp');

function readFileSafe(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function replaceOnce(source, find, replace) {
  const idx = source.indexOf(find);
  if (idx === -1) return source;
  return source.slice(0, idx) + replace + source.slice(idx + find.length);
}

function build() {
  const indexHtml = readFileSafe(srcIndex);
  const css = readFileSafe(srcCss);
  const js = readFileSafe(srcJs);

  const inlineCss = `<style>\n${css}\n</style>`;
  const inlineJs = `<script>\n${js}\n</script>`;

  let output = indexHtml;
  output = replaceOnce(output, '<link rel="stylesheet" href="css/app.css">', inlineCss);
  output = replaceOnce(output, '<script src="js/app.js"></script>', inlineJs);

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.writeFileSync(distIndex, output, 'utf8');
  console.log(`Build gerado em: ${distIndex}`);
}

build();
