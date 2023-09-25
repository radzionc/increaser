import { assertEnvVar } from '../shared/assertEnvVar'

type SecretName = 'SECRET' | 'FACEBOOK_CLIENT_SECRET' | 'GOOGLE_CLIENT_SECRET'

export const getSecret = async (name: SecretName) => {
  return assertEnvVar(name)
}
