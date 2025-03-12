import { getLastItem } from '@lib/utils/array/getLastItem'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useUser } from '@product/ui/user/state/user'
import { useUpdateUserEntityMutation } from '@product/ui/userEntity/api/useUpdateUserEntityMutation'
import { useEffect } from 'react'

import { useAssertFocusIntervals } from '../state/focusIntervals'

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
