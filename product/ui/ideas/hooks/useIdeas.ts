import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const useIdeas = () => {
  const { ideas } = useUser()

  return useMemo(() => sortEntitiesWithOrder(Object.values(ideas)), [ideas])
}
