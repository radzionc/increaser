import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { useGoals } from '@increaser/ui/goals/hooks/useGoals'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { GoalsViewSelector, goalViewStatus, useGoalsView } from './GoalsView'
import styled from 'styled-components'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { Match } from '@lib/ui/base/Match'

const Container = styled(VStack)`
  max-width: 560px;
  gap: 40px;
`

export const Goals = () => {
  const goals = useGoals()
  const [view] = useGoalsView()
  const items = useMemo(() => {
    return goals.filter((goal) => goal.status === goalViewStatus[view])
  }, [goals, view])

  return (
    <Container>
      <GoalsViewSelector />
      {view === 'active' && <GoalsTimeline />}
      <ProductEducationBlock value="goals" />
      <VStack>
        <ActiveItemIdProvider initialValue={null}>
          {items.length > 0 ? (
            items.map((item) => (
              <CurrentGoalProvider key={item.id} value={item}>
                <GoalItem />
              </CurrentGoalProvider>
            ))
          ) : (
            <ShyInfoBlock>
              <Match
                value={view}
                done={() => 'There are no completed goals yet. Keep going!'}
                active={() =>
                  'There are no active goals yet. Add your first goal to get started!'
                }
                idea={() =>
                  'There are no ideas yet. Add your first goal to get started'
                }
              />
            </ShyInfoBlock>
          )}
          {view !== 'done' && <AddGoal />}
        </ActiveItemIdProvider>
      </VStack>
    </Container>
  )
}
