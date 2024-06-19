import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { taskCadence } from '@increaser/entities/TaskFactory'

export const useTaskFactories = () => {
  const { taskFactories } = useAssertUserState()

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
