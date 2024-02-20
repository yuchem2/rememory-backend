import { config } from 'dotenv'

config()

export const { NODE_ENV, DB_URI, DB_NAME, RSA_PRIVATE_KEY_PATH, RSA_PUBLIC_KEY_PATH } = process.env
export const PORT = Number.parseInt(process.env.PORT) || 5000
