import jwt from 'jsonwebtoken'
import { assertEnvVar } from '../shared/assertEnvVar'

interface DecodedToken {
  id: string
}

export const userIdFromToken = async (token: string) => {
  const secret = assertEnvVar('SECRET')

  const decoded = jwt.verify(token, secret)

  return decoded ? (decoded as DecodedToken).id : undefined
}
