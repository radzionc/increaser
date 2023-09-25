import { convertDuration } from '@increaser/utils/time/convertDuration'
import { AuthSession } from '../../gql/schema'
import jwt from 'jsonwebtoken'
import { getSecret } from '../../utils/getSecret'

const tokenLifespanInDays = 300

export const getAuthSession = async (id: string): Promise<AuthSession> => {
  const expiresAt = Math.round(
    convertDuration(Date.now(), 'ms', 's') +
      convertDuration(tokenLifespanInDays, 'd', 's'),
  )
  const secret = await getSecret('SECRET')
  const token = jwt.sign({ id, exp: expiresAt }, secret)

  return {
    token,
    expiresAt,
  }
}
