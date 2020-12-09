module.exports = {
  "plugins": [
    "react"
  ],
  "extends": [
    "standard",
    "plugin:react/recommended"
  ],
  "settings": {
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use,
                                         // default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "detect", // React version. "detect" automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        "forbidExtraProps",
        {"property": "freeze", "object": "Object"},
    ]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "jsx": true
    }
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
