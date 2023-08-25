import { UserInfoFromProvider } from './UserInfoFromProvider'

export interface ValidatorArgs {
  code: string
  redirectUri: string
}

export type OAuthValidator = (
  args: ValidatorArgs,
) => Promise<UserInfoFromProvider>
