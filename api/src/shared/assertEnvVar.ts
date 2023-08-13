type VariableName =
  | 'SECRET'
  | 'SENTRY_KEY'
  | 'FACEBOOK_CLIENT_ID'
  | 'FACEBOOK_CLIENT_SECRET'
  | 'GOOGLE_CLIENT_ID'
  | 'GOOGLE_CLIENT_SECRET'

export const assertEnvVar = (name: VariableName): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
