const commonjs = require('rollup-plugin-commonjs');
const fs = require('fs');
const path = require('path');
const resolve = require('rollup-plugin-node-resolve');

module.exports = [
  ...configDirectives(),
  {
    input: 'lib/browser.js',
    plugins: [commonjs(), resolve({ browser: true })],
    output: {
      exports: 'named',
      file: 'browser.js',
      format: 'umd',
      name: 'litHtmlServer'
    }
  },
  {
    external: ['stream', 'fs'],
    input: 'lib/index.js',
    plugins: [commonjs(), resolve()],
    output: {
      exports: 'named',
      file: 'index.js',
      format: 'cjs'
    }
  }
];

function configDirectives() {
  const dir = path.resolve('lib/directives');
  const directives = fs.readdirSync(dir);
  const plugins = [commonjs(), resolve({ browser: true })];
  const config = [];

  for (const directive of directives) {
    if (path.extname(directive) === '.js') {
      config.push({
        input: path.join(dir, directive),
        plugins,
        output: {
          file: path.join('directives', directive),
          format: 'umd',
          name: `litHtmlServer.directives.${directive.replace('.js', '')}`
        }
      });
    }
  }

  return config;
}