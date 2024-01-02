import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const appUrl = shouldBePresent(process.env.NEXT_PUBLIC_APP_URL)
