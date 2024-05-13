import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { WeekDeadlinesOverview } from './WeekDeadlinesOverview'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { splitBy } from '@lib/utils/array/splitBy'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import styled from 'styled-components'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { getColor } from '@lib/ui/theme/getters'
import { borderRadius } from '@lib/ui/css/borderRadius'

const Container = styled(UniformColumnGrid)`
  ${borderRadius.m};
  overflow: hidden;
  > * {
    padding: 20px;
    background: ${getColor('foreground')};
  }
`

export const TasksDeadlinesOverview = () => {
  const weekStartedAt = useStartOfWeek()
  const nextWeekStartsAt = weekStartedAt + convertDuration(1, 'w', 'ms')
  const { tasks } = useAssertUserState()
  const [thisWeekTasks, nextWeekTasks] = splitBy(
    Object.values(tasks),
    (task) => (task.deadlineAt > nextWeekStartsAt ? 1 : 0),
  )

  return (
    <Container gap={1} minChildrenWidth={240}>
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
    </Container>
  )
}
