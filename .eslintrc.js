module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
  },
  settings: {
    // depois uma forma de usar com alias do node
    'import/resolver': {
      'import/no-unresolved': off,
    },
  },
};
