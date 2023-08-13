import jwt from 'jsonwebtoken'
import { assertEnvVar } from '../shared/assertEnvVar'

const jwtLifespanInSeconds = 15552000

const getTokenExpirationTime = (seconds: number) =>
  Math.floor(Date.now() / 1000) + seconds

export const generateAuthData = (id: string) => {
  const tokenExpirationTime = getTokenExpirationTime(jwtLifespanInSeconds)
  const secret = assertEnvVar('SECRET')

  return {
    token: jwt.sign({ id, exp: tokenExpirationTime }, secret),
    tokenExpirationTime,
  } as const
}
