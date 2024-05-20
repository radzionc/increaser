import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { TaskTrackedTimeContainer } from '@increaser/ui/tasks/TaskTrackedTimeContainer'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const CurrentFocusTaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()
  const { task } = useCurrentFocus()
  const { startedAt } = shouldBePresent(task)

  return (
    <TaskTrackedTimeContainer>
      <RhytmicRerender
        interval={1000}
        render={() =>
          formatDuration((spentTime ?? 0) + (Date.now() - startedAt), 'ms')
        }
      />
    </TaskTrackedTimeContainer>
  )
}
