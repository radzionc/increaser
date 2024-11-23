import { useEffect } from 'react'

import { useUser } from '@increaser/ui/user/state/user'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useUpdateUserEntityMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntityMutation'
import { useAssertFocusIntervals } from '../state/focusIntervals'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

export const FocusTaskObserver = () => {
  const { tasks } = useUser()

  const intervals = useAssertFocusIntervals()

  const { mutate: updateTaskMutation } = useUpdateUserEntityMutation('task')

  useEffect(() => {
    const { taskId } = getLastItem(intervals)
    if (!taskId) return

    const task = tasks[taskId]
    if (!task) return

    if (task.status === 'inProgress' || task.status === 'done') return

    const status = 'inProgress'

    updateTaskMutation({
      id: taskId,
      fields: {
        status,
        order: getLastItemOrder(
          Object.values(tasks)
            .filter((task) => task.status === status)
            .map((task) => task.order),
        ),
      },
    })
  }, [intervals, tasks, updateTaskMutation])

  return null
}
