import jwt from 'jsonwebtoken'
import { assertEnvVar } from '../../shared/assertEnvVar'
import { getTokenExpirationTime } from './getTokenExpirationTime'

const authLinkLifespanInSeconds = 20 * 60

export const generateAuthLinkToken = (email: string) =>
  jwt.sign(
    {
      email,
      exp: getTokenExpirationTime(authLinkLifespanInSeconds),
    },
    assertEnvVar('SECRET'),
  )
