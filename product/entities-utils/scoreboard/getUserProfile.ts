import { UserProfile } from '@product/entities/PerformanceScoreboard'
import { User } from '@product/entities/User'

export const getUserProfile = ({
  name,
  country,
  isAnonymous,
}: Pick<User, 'name' | 'country' | 'isAnonymous'>): UserProfile | null =>
  isAnonymous
    ? null
    : {
        country,
        name,
      }
