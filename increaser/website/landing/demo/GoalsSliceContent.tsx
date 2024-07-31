import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import styled from 'styled-components'
import { GoalItemContent } from '@increaser/ui/goals/GoalItemContent'
import { VStack } from '@lib/ui/layout/Stack'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { useFilteredScheduledGoals } from '@increaser/ui/goals/filter/useFilteredScheduledGoals'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
  width: 100%;
`

export const GoalsSliceContent = () => {
  const items = useFilteredScheduledGoals()

  return (
    <Container>
      <GoalsTimeline />
      {items.map((item) => (
        <CurrentGoalProvider key={item.id} value={item}>
          <GoalItemContent />
        </CurrentGoalProvider>
      ))}
    </Container>
  )
}
