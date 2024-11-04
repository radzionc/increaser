import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import styled from 'styled-components'
import { GoalItemContent } from '@increaser/ui/goals/GoalItemContent'
import { VStack } from '@lib/ui/css/stack'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { useFilteredScheduledGoals } from '@increaser/ui/goals/filter/useFilteredScheduledGoals'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveGoal } from '@increaser/ui/goals/ActiveGoal'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
  width: 100%;
`

export const GoalsSliceContent = () => {
  const items = useFilteredScheduledGoals()

  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActiveGoal />
      <Container>
        <GoalsTimeline />
        {items.map((item) => (
          <CurrentGoalProvider key={item.id} value={item}>
            <GoalItemContent />
          </CurrentGoalProvider>
        ))}
      </Container>
    </ActiveItemIdProvider>
  )
}
