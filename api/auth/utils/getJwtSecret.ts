import { assertEnvVar } from '../../shared/assertEnvVar'

// TODO: find a safer way to store the secret
export const getJwtSecret = async () => {
  return assertEnvVar('SECRET')
}
