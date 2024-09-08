import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { TaskTrackedTimeContent } from './TaskTrackedTimeContent'
import { useFocus } from '../../focus/FocusContext'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getTasksTimeSpent } from '../../focus/utils/getTasksTimeSpent'
import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'

export const TaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()

  const { intervals } = useFocus()

  const { id } = useCurrentTask()

  if (intervals && intervals.some((interval) => interval.taskId === id)) {
    const lastInterval = getLastItem(intervals)
    if (lastInterval.taskId === id && lastInterval.end === null) {
      const prevValue =
        (getTasksTimeSpent(intervals.slice(0, -1))[id] || 0) + (spentTime || 0)

      return (
        <RhythmicRerender
          render={(now) => (
            <TaskTrackedTimeContent
              value={prevValue + (now - lastInterval.start)}
            />
          )}
        />
      )
    }

    const value = (getTasksTimeSpent(intervals)[id] || 0) + (spentTime || 0)

    return <TaskTrackedTimeContent value={value} />
  }

  if (!spentTime) {
    return null
  }

  return <TaskTrackedTimeContent value={spentTime} />
}
