import { CountryCode } from '@lib/countries'

export type ProfileFormShape = {
  name: string | null
  country: CountryCode | null
}
