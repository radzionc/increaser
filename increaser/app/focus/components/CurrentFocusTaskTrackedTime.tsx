import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { RhythmicRerender } from '@lib/ui/base/RhythmicRerender'
import { TaskTrackedTimeContainer } from '@increaser/ui/tasks/TaskTrackedTimeContainer'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { sum } from '@lib/utils/array/sum'
import { useAssertFocusIntervals } from '@increaser/ui/focus/FocusContext'
import { useFocusTarget } from '../state/useFocusTarget'

export const CurrentFocusTaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()
  const intervals = useAssertFocusIntervals()
  const [{ taskId }] = useFocusTarget()

  return (
    <TaskTrackedTimeContainer>
      <RhythmicRerender
        render={(now) => {
          const duration = sum(
            intervals
              .filter((interval) => interval.taskId === taskId)
              .map((interval) =>
                getIntervalDuration({
                  ...interval,
                  end: interval.end ?? now,
                }),
              ),
          )

          return formatDuration((spentTime ?? 0) + duration, 'ms')
        }}
      />
    </TaskTrackedTimeContainer>
  )
}
