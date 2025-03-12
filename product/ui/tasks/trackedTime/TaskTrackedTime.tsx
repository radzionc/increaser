import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useFocusIntervals } from '@product/ui/focus/state/focusIntervals'
import { useCurrentTask } from '@product/ui/tasks/CurrentTaskProvider'

import { getTasksTimeSpent } from '../../focus/utils/getTasksTimeSpent'

import { TaskTrackedTimeContent } from './TaskTrackedTimeContent'

export const TaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()

  const [intervals] = useFocusIntervals()

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
