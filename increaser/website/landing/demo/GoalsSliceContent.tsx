import styled from 'styled-components'
import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveGoal } from '@increaser/ui/goals/ActiveGoal'
import { GoalList } from '@increaser/ui/goals/GoalList'
import { GoalsTimelineContent } from '@increaser/ui/goals/timeline/GoalsTimelineContent'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 600px;
  width: 100%;
`

export const GoalsSliceContent = () => {
  return (
    <ActiveItemIdProvider initialValue={null}>
      <ActiveGoal />
      <Container>
        <GoalsTimelineContent />
        <GoalList />
      </Container>
    </ActiveItemIdProvider>
  )
}
