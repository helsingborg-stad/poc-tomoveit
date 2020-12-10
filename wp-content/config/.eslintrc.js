module.exports = {
  "extends": "standard",
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
  },
  "env": {
    "browser": true
  },
  "rules": {
    "no-alert": "off",
    "no-unused-vars": "warn",
    "spaced-comment": "warn",
    "semi": [ "error", "always"],
    "camelcase": [ "off", { "properties": "always" } ],
    "padded-blocks": ["error", { "blocks": "never" },
    ],
    "space-before-function-paren": [
      "error",
      "never",
    ],
    "comma-dangle": [ "error", "always-multiline" ],
  }
};
