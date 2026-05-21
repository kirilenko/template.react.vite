import { parseEnv } from '@/libs/env'

const env = parseEnv({
  VITE_SOMETHING_VAR: {
    required: true,
    type: 'number',
  },
})

export { env }
