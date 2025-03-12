import { convertDuration } from '@lib/utils/time/convertDuration'
import { freeTrialDurationInDays } from '@product/entities/Membership'
import { User, userDefaultFields } from '@product/entities/User'
import { getId } from '@product/entities-utils/shared/getId'

export const getUserInitialFields = ({
  email,
  name,
  country,
  timeZone,
}: Pick<User, 'email' | 'name' | 'country' | 'timeZone'>): User => {
  const registeredAt = Date.now()
  const freeTrialEndsAt =
    registeredAt + convertDuration(freeTrialDurationInDays, 'd', 'ms')

  return {
    ...userDefaultFields,
    id: getId(),
    email,
    name,
    country,
    registrationDate: registeredAt,
    freeTrialEnd: freeTrialEndsAt,
    lastVisitAt: registeredAt,
    timeZone,
  }
}
