import { CountryCode } from '@increaser/utils/countries'

export interface ApiResolverContext {
  country?: CountryCode
  userId?: string
}
