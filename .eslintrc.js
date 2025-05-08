module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-undef": "error", // Show error if variable not defined
    "no-unused-vars": "warn", // Warn if variable is declared but not used
    "no-console": "off", // Allow console.log
  },
};
