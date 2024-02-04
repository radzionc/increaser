import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { WeekDeadlinesOverview } from './WeekDeadlinesOverview'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { splitBy } from '@lib/utils/array/splitBy'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { Panel } from '@lib/ui/panel/Panel'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import styled from 'styled-components'

const Container = styled(Panel)`
  > * {
    flex: 1;
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
    <ElementSizeAware
      render={({ setElement, size }) => {
        return (
          <Container
            direction={size && size.width < 520 ? 'column' : 'row'}
            withSections
            ref={setElement}
          >
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
      }}
    />
  )
}
