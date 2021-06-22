module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', './src/client/tsconfig.json'],
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "eslint-plugin-import-helpers"
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '*.js', '*.jsx', '*.d.ts'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    "semi": [2, "always"],
    "quotes": ["warn", "single"],
    "prettier/prettier": 'warn',
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          ["/^@react/","/^react/", "/^@next/","/^next/", "/^@nest/",],
          "module",
          "/^@components/",
          "/^@validators/",
          "/^@icons/",
          [
            "/^src/",
            "parent",
            "sibling",
            "index"
          ]
        ],
        "alphabetize": {
          "order": "asc",
          "ignoreCase": true
        }
      }
    ]
  },
};