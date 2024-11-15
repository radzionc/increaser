import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'

export const useIdeas = () => {
  const { ideas } = useUser()

  return useMemo(() => sortEntitiesWithOrder(Object.values(ideas)), [ideas])
}
