import { getSecret } from '@product/secrets'
import jwt from 'jsonwebtoken'

import { AuthenticationResult } from './AuthenticationResult'

interface AuthenticateWithEmailParams {
  code: string
}

interface EmailCodePayload {
  email: string
}

export const authenticateWithEmail = async ({
  code,
}: AuthenticateWithEmailParams): Promise<AuthenticationResult> => {
  const secret = await getSecret('emailSecret')
  const { email } = jwt.verify(code, secret) as EmailCodePayload

  return {
    email,
  }
}
