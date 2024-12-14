import { useApiQuery } from '@increaser/api-ui/hooks/useApiQuery'
import { UserProfile } from '@increaser/entities/PerformanceScoreboard'
import { Spinner } from '@lib/ui/loaders/Spinner'
import {
  MatchQuery,
  MatchQueryWrapperProps,
} from '@lib/ui/query/components/MatchQuery'

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
