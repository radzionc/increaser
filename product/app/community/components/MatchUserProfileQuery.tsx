import { Spinner } from '@lib/ui/loaders/Spinner'
import {
  MatchQuery,
  MatchQueryWrapperProps,
} from '@lib/ui/query/components/MatchQuery'
import { useApiQuery } from '@product/api-ui/hooks/useApiQuery'
import { UserProfile } from '@product/entities/PerformanceScoreboard'

type MatchUserProfileQueryProps = MatchQueryWrapperProps<UserProfile | null> & {
  id: string
}

export const MatchUserProfileQuery = ({
  id,
  ...rest
}: MatchUserProfileQueryProps) => {
  const query = useApiQuery('userProfile', { id })

  return <MatchQuery pending={() => <Spinner />} value={query} {...rest} />
}
