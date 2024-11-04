import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { useFilteredScheduledGoals } from '@increaser/ui/goals/filter/useFilteredScheduledGoals'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveGoal } from '@increaser/ui/goals/ActiveGoal'
import { ManageGoalsTimelineType } from '@increaser/ui/goals/timeline/ManageGoalsTimelineType'
import { GoalList } from '@increaser/ui/goals/GoalList'

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
        <GoalsTimeline
          style={{ gap: 20 }}
          controls={<ManageGoalsTimelineType />}
        />
        <GoalList />
      </Container>
    </ActiveItemIdProvider>
  )
}
