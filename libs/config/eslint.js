/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
};
