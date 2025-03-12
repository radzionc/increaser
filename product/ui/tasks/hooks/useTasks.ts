import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const useTasks = () => {
  const { tasks } = useUser()

  return useMemo(() => {
    return sortEntitiesWithOrder(Object.values(tasks))
  }, [tasks])
}
