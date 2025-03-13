import { IncomingHttpHeaders } from 'http'

import { CountryCode } from '@lib/countries'
import { attempt, withFallback } from '@lib/utils/attempt'
import { getUser } from '@product/db/user'

import { userIdFromToken } from '../../auth/userIdFromToken'
import { extractHeaderValue } from '../../utils/extractHeaderValue'
import { ApiResolverContext } from '../ApiResolverContext'

interface GetResolverContextParams {
  headers: IncomingHttpHeaders
}

const getUserId = async (token: string) => {
  const userId = token
    ? await withFallback(attempt(userIdFromToken(token)), undefined)
    : undefined

  if (userId) {
    const { data } = await attempt(() => getUser(userId, ['id']))
    if (data) {
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
