type VariableName =
  | 'SENTRY_KEY'
  | 'FACEBOOK_CLIENT_ID'
  | 'GOOGLE_CLIENT_ID'
  | 'APP_URL'
  | 'EMAIL_DOMAIN'
  | 'TELEGRAM_BOT_TOKEN'
  | 'TELEGRAM_CHAT_ID'
  | 'PUBLIC_BUCKET_NAME'
  | 'PUBLIC_BUCKET_REGION'

export const getEnvVar = (name: VariableName): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
