import { getId } from '@increaser/entities-utils/shared/getId'
import { freeTrialDurationInDays } from '@increaser/entities/Membership'
import { User, userDefaultFields } from '@increaser/entities/User'
import { convertDuration } from '@increaser/utils/time/convertDuration'

export const getUserInitialFields = ({
  email,
  name,
  country,
  timeZone,
}: Pick<User, 'email' | 'name' | 'country' | 'timeZone'>): Omit<
  User,
  'updatedAt'
> => {
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
    timeZone,
  }
}
