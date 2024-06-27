import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { useMemo } from 'react'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { FocusTaskSelector } from './FocusTaskSelector'
import { CreateFocusTaskPrompt } from './CreateFocusTaskPrompt'

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

  if (!options.length) {
    return <CreateFocusTaskPrompt />
  }

  return <FocusTaskSelector options={options} />
}
