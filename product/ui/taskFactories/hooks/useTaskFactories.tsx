import { order } from '@lib/utils/array/order'
import { taskCadence } from '@product/entities/TaskFactory'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

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
