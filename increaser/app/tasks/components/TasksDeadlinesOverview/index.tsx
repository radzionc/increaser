import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { WeekDeadlinesOverview } from './WeekDeadlinesOverview'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { splitBy } from '@lib/utils/array/splitBy'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const TasksDeadlinesOverview = () => {
  const weekStartedAt = useStartOfWeek()
  const nextWeekStartsAt = weekStartedAt + convertDuration(1, 'w', 'ms')
  const { tasks } = useAssertUserState()
  const [thisWeekTasks, nextWeekTasks] = splitBy(tasks, (task) =>
    task.deadlineAt > nextWeekStartsAt ? 1 : 0,
  )

  return (
    <UniformColumnGrid minChildrenWidth={160} gap={20}>
      <WeekDeadlinesOverview
        name="This week"
        tasks={thisWeekTasks}
        startedAt={weekStartedAt}
      />
      <WeekDeadlinesOverview
        name="Next week"
        tasks={nextWeekTasks}
        startedAt={nextWeekStartsAt}
        showWorkdays={false}
      />
    </UniformColumnGrid>
  )
}
