import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'

export const useTasks = () => {
  const { tasks } = useAssertUserState()

  return useMemo(() => {
    return sortEntitiesWithOrder(Object.values(tasks))
  }, [tasks])
}
