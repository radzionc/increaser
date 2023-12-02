import { UserProfile } from '@increaser/entities/PerformanceScoreboard'
import { User } from '@increaser/entities/User'

export const getUserProfile = ({
  name,
  country,
  isAnonymous,
}: Pick<User, 'name' | 'country' | 'isAnonymous'>): UserProfile | undefined =>
  isAnonymous
    ? undefined
    : {
        country,
        name,
      }
