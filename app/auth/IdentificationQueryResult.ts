export interface IdentificationQueryResult {
  email: string
  name: string | null
  token: string
  tokenExpirationTime: number
  id: string
  firstIdentification: boolean
}
