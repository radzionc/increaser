import { convertDuration } from '@lib/utils/time/convertDuration'
import { AuthSession } from '@product/entities/AuthSession'
import { getSecret } from '@product/secrets'
import jwt from 'jsonwebtoken'

const tokenLifespanInDays = 300

export const getAuthSession = async (
  id: string,
): Promise<Omit<AuthSession, 'isFirst'>> => {
  const expiresAt = Math.round(
    convertDuration(Date.now(), 'ms', 's') +
      convertDuration(tokenLifespanInDays, 'd', 's'),
  )
  const secret = await getSecret('jwtSecret')
  const token = jwt.sign({ id, exp: expiresAt }, secret)

  return {
    token,
    expiresAt,
  }
}
