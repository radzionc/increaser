import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'
import { WeekDeadlinesOverview } from './WeekDeadlinesOverview'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { splitBy } from '@lib/utils/array/splitBy'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import styled from 'styled-components'
import { Panel } from '@lib/ui/panel/Panel'
import { getColor } from '@lib/ui/theme/getters'
import { ElementSizeAware } from '@lib/ui/base/ElementSizeAware'
import { VStack } from '@lib/ui/layout/Stack'

const Container = styled(Panel)`
  background: ${getColor('foreground')};
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
`

const RowSeparator = styled.div`
  height: 100%;
  width: 1px;
  background: ${getColor('mistExtra')};
`

export const TasksDeadlinesOverview = () => {
  const weekStartedAt = useStartOfWeek()
  const nextWeekStartsAt = weekStartedAt + convertDuration(1, 'w', 'ms')
  const { tasks } = useAssertUserState()
  const [thisWeekTasks, nextWeekTasks] = splitBy(tasks, (task) =>
    task.deadlineAt > nextWeekStartsAt ? 1 : 0,
  )

  return (
    <ElementSizeAware
      render={({ setElement, size }) => {
        const firstItem = (
          <WeekDeadlinesOverview
            name="This week"
            tasks={thisWeekTasks}
            startedAt={weekStartedAt}
          />
        )

        const secondItem = (
          <WeekDeadlinesOverview
            name="Next week"
            tasks={nextWeekTasks}
            startedAt={nextWeekStartsAt}
            showWorkdays={false}
          />
        )
        return (
          <Container ref={setElement}>
            {size && size.width < 520 ? (
              <VStack gap={28}>
                {firstItem}
                {secondItem}
              </VStack>
            ) : (
              <Row>
                {firstItem}
                <RowSeparator />
                {secondItem}
              </Row>
            )}
          </Container>
        )
      }}
    />
  )
}
