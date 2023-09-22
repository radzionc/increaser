import { convertDuration } from '@increaser/utils/time/convertDuration'
import { AuthSession } from '../../gql/schema'
import jwt from 'jsonwebtoken'
import { getJwtSecret } from './getJwtSecret'

const tokenLifespanInDays = 300

export const getAuthSession = async (id: string): Promise<AuthSession> => {
  const expiresAt = Math.round(
    convertDuration(Date.now(), 'ms', 's') +
      convertDuration(tokenLifespanInDays, 'd', 's'),
  )
  const secret = await getJwtSecret()
  const token = jwt.sign({ id, exp: expiresAt }, secret)

  return {
    token,
    expiresAt,
  }
}
