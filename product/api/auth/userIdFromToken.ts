import { getSecret } from '@product/secrets'
import jwt from 'jsonwebtoken'

interface DecodedToken {
  id: string
}

export const userIdFromToken = async (token: string) => {
  const secret = await getSecret('jwtSecret')

  const decoded = jwt.verify(token, secret)

  return decoded ? (decoded as DecodedToken).id : undefined
}
