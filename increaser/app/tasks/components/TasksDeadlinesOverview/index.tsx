import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { WeekDeadlinesOverview } from './WeekDeadlinesOverview'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { splitBy } from '@lib/utils/array/splitBy'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(Panel)`
  background: ${getColor('foreground')};
`

export const TasksDeadlinesOverview = () => {
  const weekStartedAt = useStartOfWeek()
  const nextWeekStartsAt = weekStartedAt + convertDuration(1, 'w', 'ms')
  const { tasks } = useAssertUserState()
  const [thisWeekTasks, nextWeekTasks] = splitBy(tasks, (task) =>
    task.deadlineAt > nextWeekStartsAt ? 1 : 0,
  )

  return (
    <Container>
      <UniformColumnGrid minChildrenWidth={160} gap={40}>
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
    </Container>
  )
}
