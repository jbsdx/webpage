const path = require('path');
module.exports = {
  extends: '@loopback/eslint-config',
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
  },
};
