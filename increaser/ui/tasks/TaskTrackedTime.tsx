import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { TaskTrackedTimeContainer } from './TaskTrackedTimeContainer'

export const TaskTrackedTime = () => {
  const { spentTime } = useCurrentTask()

  if (!spentTime) return null

  return (
    <TaskTrackedTimeContainer>
      {formatDuration(spentTime, 'ms')}
    </TaskTrackedTimeContainer>
  )
}
