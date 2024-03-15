import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { UserProfile } from '@increaser/entities/PerformanceScoreboard'
import {
  QueryDependant,
  QueryDependantWrapperProps,
} from '@lib/ui/query/components/QueryDependant'
import { getQueryDependantDefaultProps } from '@lib/ui/query/utils/getQueryDependantDefaultProps'

type UserProfileQueryDependantProps =
  QueryDependantWrapperProps<UserProfile | null> & {
    id: string
  }

export const UserProfileQueryDependant = ({
  id,
  ...rest
}: UserProfileQueryDependantProps) => {
  const query = useApiQuery('userProfile', { id })

  return (
    <QueryDependant
      query={query}
      {...getQueryDependantDefaultProps('user profile')}
      {...rest}
    />
  )
}
