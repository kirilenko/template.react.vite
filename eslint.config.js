import config from 'eslint-config-k8'
import globals from 'globals'

export default [
  ...config,
  {
    files: ['scripts/**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['src/app/app.router.tsx'],
    rules: {
      // TanStack Router's redirect() is intentionally thrown but is not an Error instance
      '@typescript-eslint/only-throw-error': 'off',
    },
  },
]
