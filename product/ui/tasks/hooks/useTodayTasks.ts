import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { order } from '@lib/utils/array/order'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUser } from '@product/ui/user/state/user'
import { useMemo } from 'react'

export const useTodayTasks = () => {
  const { tasks } = useUser()
  const todayStartedAt = useStartOfDay()

  return useMemo(
    () =>
      order(
        Object.values(tasks).filter(
          ({ deadlineAt }) =>
            deadlineAt &&
            deadlineAt >= todayStartedAt &&
            deadlineAt < todayStartedAt + convertDuration(1, 'd', 'ms'),
        ),
        (task) => task.order,
        'asc',
      ),
    [tasks, todayStartedAt],
  )
}
