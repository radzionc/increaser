import { IncomingHttpHeaders } from 'http'
import { ApiResolverContext } from '../ApiResolverContext'
import { CountryCode } from '@lib/countries'
import { userIdFromToken } from '../../auth/userIdFromToken'
import { safeResolve } from '@lib/utils/promise/safeResolve'
import { extractHeaderValue } from '../../utils/extractHeaderValue'
import { getUser } from '@increaser/db/user'

interface GetResolverContextParams {
  headers: IncomingHttpHeaders
}

const getUserId = async (token: string) => {
  const userId = await safeResolve(userIdFromToken(token), undefined)

  if (userId) {
    const verifiedUser = await safeResolve(getUser(userId, ['id']), undefined)
    if (verifiedUser) {
      return userId
    }
  }

  return undefined
}

export const getResolverContext = async ({
  headers,
}: GetResolverContextParams): Promise<ApiResolverContext> => {
  const country = extractHeaderValue<CountryCode>(
    headers,
    'cloudfront-viewer-country',
  )
  const token = extractHeaderValue(headers, 'authorization')
  const userId = token ? await getUserId(token) : undefined

  return {
    country,
    userId,
  }
}
