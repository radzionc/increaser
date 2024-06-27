import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { useMemo, useState } from 'react'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { FocusTaskSelector } from './FocusTaskSelector'
import { CreateFocusTaskPrompt } from './CreateFocusTaskPrompt'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { CreateFocusTaskOverlay } from './CreateFocusTaskOverlay'

export const SelectFocusTask = () => {
  const { projectId } = useCurrentFocus()
  const { tasks } = useAssertUserState()
  const options = useMemo(() => {
    return order(
      Object.values(tasks).filter(
        (task) =>
          task.projectId === projectId &&
          !task.completedAt &&
          ['overdue', 'today'].includes(
            getDeadlineStatus({ ...task, now: Date.now() }),
          ),
      ),
      (task) => task.order,
      'asc',
    )
  }, [projectId, tasks])

  const [isCreatingTask, setIsCreatingTask] = useState(false)

  if (isCreatingTask) {
    return (
      <CreateFocusTaskOverlay
        order={getLastItemOrder(options.map((option) => option.order))}
        onFinish={() => setIsCreatingTask(false)}
      />
    )
  }

  if (!options.length) {
    return <CreateFocusTaskPrompt onClick={() => setIsCreatingTask(true)} />
  }

  return (
    <FocusTaskSelector
      onAdd={() => setIsCreatingTask(true)}
      options={options}
    />
  )
}
