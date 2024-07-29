import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { TaskTrackedTimeContainer } from '@increaser/ui/tasks/TaskTrackedTimeContainer'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { sum } from '@lib/utils/array/sum'

export const CurrentFocusTaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()
  const { intervals } = useCurrentFocus()

  const taskId = getLastItem(intervals)?.taskId

  return (
    <TaskTrackedTimeContainer>
      <RhytmicRerender
        render={() => {
          const duration = sum(
            intervals
              .filter((interval) => interval.taskId === taskId)
              .map((interval) =>
                getIntervalDuration({
                  ...interval,
                  end: interval.end ?? Date.now(),
                }),
              ),
          )

          return formatDuration((spentTime ?? 0) + duration, 'ms')
        }}
      />
    </TaskTrackedTimeContainer>
  )
}
