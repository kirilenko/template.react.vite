import { parseEnv } from '@/libs/env'

const env = parseEnv({
  VITE_REACT_SCAN: {
    type: 'boolean',
  },
  VITE_REST_URL: {
    required: true,
    type: 'string',
  },
  VITE_SOMETHING_VAR: {
    required: true,
    type: 'number',
  },
})

export { env }
