import jwt from 'jsonwebtoken'
import { assertEnvVar } from '../../shared/assertEnvVar'

interface EmailAuthTokenPayload {
  email: string
}

export const decodeEmailAuthToken = (token: string) => {
  const decoded = jwt.verify(token, assertEnvVar('SECRET'))

  return decoded ? (decoded as EmailAuthTokenPayload).email : undefined
}
