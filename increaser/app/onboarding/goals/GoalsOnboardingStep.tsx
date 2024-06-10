import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { Goals } from '@increaser/ui/goals/Goals'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
`

export const GoalsOnboardingStep = () => {
  return (
    <Container>
      <VStack gap={40}>
        <GoalsTimeline />
        <VStack>
          <ActiveItemIdProvider initialValue={null}>
            <Goals />
            <AddGoal />
          </ActiveItemIdProvider>
        </VStack>
      </VStack>
    </Container>
  )
}
