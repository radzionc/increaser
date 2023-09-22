import { assertEnvVar } from '../../shared/assertEnvVar'
import { AuthenticationResult } from './AuthenticationResult'
import jwt from 'jsonwebtoken'

interface AuthenticateWithEmailParams {
  code: string
}

interface EmailCodePayload {
  email: string
}

export const authenticateWithEmail = async ({
  code,
}: AuthenticateWithEmailParams): Promise<AuthenticationResult> => {
  const { email } = jwt.verify(code, assertEnvVar('SECRET')) as EmailCodePayload

  return {
    email,
  }
}
