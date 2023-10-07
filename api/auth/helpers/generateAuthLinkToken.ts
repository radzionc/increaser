import jwt from 'jsonwebtoken'
import { getTokenExpirationTime } from './getTokenExpirationTime'
import { getSecret } from '../../utils/getSecret'

const authLinkLifespanInSeconds = 20 * 60

export const generateAuthLinkToken = async (email: string) =>
  jwt.sign(
    {
      email,
      exp: getTokenExpirationTime(authLinkLifespanInSeconds),
    },
    await getSecret('EMAIL_SECRET'),
  )
