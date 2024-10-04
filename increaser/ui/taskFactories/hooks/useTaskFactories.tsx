import { useMemo } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { order } from '@lib/utils/array/order'
import { taskCadence } from '@increaser/entities/TaskFactory'

export const useTaskFactories = () => {
  const { taskFactories } = useUser()

  return useMemo(
    () =>
      order(
        Object.values(taskFactories),
        ({ cadence }) => taskCadence.indexOf(cadence),
        'asc',
      ),
    [taskFactories],
  )
}
