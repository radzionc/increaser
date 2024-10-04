import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'

export const useTasks = () => {
  const { tasks } = useUser()

  return useMemo(() => {
    return sortEntitiesWithOrder(Object.values(tasks))
  }, [tasks])
}
