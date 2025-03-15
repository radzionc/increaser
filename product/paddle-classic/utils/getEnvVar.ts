type VariableName = 'PADDLE_VENDOR_ID'

export const getEnvVar = (name: VariableName): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing ${name} environment variable`)
  }

  return value
}
