export default [
  {
    ignores: ['*/sw.js'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2024,
        sourceType: 'module',
      },
    },
    files: ['*/_assets/js/**/*.js'],
  },
]