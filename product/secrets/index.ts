export const secretNames = [
  'googleClientSecret',
  'telegramBotToken',
  'emailSecret',
  'jwtSecret',
] as const

type SecretName = (typeof secretNames)[number]

const envVarMap: Record<SecretName, string> = {
  googleClientSecret: 'GOOGLE_CLIENT_SECRET',
  telegramBotToken: 'TELEGRAM_BOT_TOKEN',
  emailSecret: 'EMAIL_SECRET',
  jwtSecret: 'JWT_SECRET',
}

export const getSecret = async <T = string>(name: SecretName): Promise<T> => {
  const envVar = envVarMap[name]
  const value = process.env[envVar]
  if (!value) {
    throw new Error(`Missing environment variable: ${envVar}`)
  }
  return value as T
}
