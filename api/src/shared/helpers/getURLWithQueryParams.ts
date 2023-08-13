import { getQueryParams } from './getQueryParams'

export const getURLWithQueryParams = (base: string, params: Object) =>
  `${base}?${getQueryParams(params)}`
