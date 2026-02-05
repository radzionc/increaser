import { User, userDefaultFields } from '@product/entities/User'
import { getId } from '@product/entities-utils/shared/getId'

export const getUserInitialFields = ({
  email,
  name,
  country,
  timeZone,
}: Pick<User, 'email' | 'name' | 'country' | 'timeZone'>): User => {
  const registeredAt = Date.now()

  return {
    ...userDefaultFields,
    id: getId(),
    email,
    name,
    country,
    registrationDate: registeredAt,
    freeTrialEnd: 0,
    lastVisitAt: registeredAt,
    timeZone,
  }
}
