import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ActiveGoal } from '@product/ui/goals/ActiveGoal'
import { GoalList } from '@product/ui/goals/GoalList'
import { GoalsTimelineContent } from '@product/ui/goals/timeline/GoalsTimelineContent'
import styled from 'styled-components'

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
