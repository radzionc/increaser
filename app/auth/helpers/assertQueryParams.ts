import { pick } from 'shared/utils/pick'
import { queryStringToObject } from 'shared/utils/queryStringToObject'

export const assertQueryParams = (keys: string[]) => {
  const queryString = window.location.search

  if (!queryString) {
    throw new Error('No query string')
  }

  const queryParams = pick(queryStringToObject(queryString), keys)

  for (const key of keys) {
    if (!queryParams[key]) {
      throw new Error(`Missing query parameter: ${key}`)
    }
  }

  return queryParams
}
