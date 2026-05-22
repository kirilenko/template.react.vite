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
]
