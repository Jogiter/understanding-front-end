// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  extends: "standard",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    // indent: ["error", 2],
    quotes: ["off", "single"],
    // semi: ["error", "always"]
  },
  globals: {
  }
};
