import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { joinPaths } from '@lib/utils/query/joinPaths'

export const appUrl = shouldBePresent(process.env.NEXT_PUBLIC_APP_URL)
export const signInUrl = joinPaths(appUrl, 'sign-in')
export const signUpUrl = joinPaths(appUrl, 'sign-up')
