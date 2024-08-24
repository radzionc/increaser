import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useFilteredGoals } from '@increaser/ui/goals/filter/useFilteredGoals'
import { PageHeaderControlsArea } from '../ui/page/header/PageHeaderControlsAreaProvider'
import { GoalStatusFilter } from '@increaser/ui/goals/filter/GoalStatusFilter'
import styled from 'styled-components'

const Container = styled(VStack)`
  gap: 32px;
  width: 100%;
  max-width: 560px;
`

export const Goals = () => {
  const items = useFilteredGoals()

  return (
    <Container>
      <PageHeaderControlsArea>
        <GoalStatusFilter />
      </PageHeaderControlsArea>
      <GoalsTimeline />
      <VStack>
        <ActiveItemIdProvider initialValue={null}>
          {items.map((item) => (
            <CurrentGoalProvider key={item.id} value={item}>
              <GoalItem />
            </CurrentGoalProvider>
          ))}
          <AddGoal />
        </ActiveItemIdProvider>
      </VStack>
    </Container>
  )
}
