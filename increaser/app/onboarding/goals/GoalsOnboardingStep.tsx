import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { ManageDob } from '@increaser/ui/goals/dob/ManageDob'
import { Goals } from '@increaser/ui/goals/Goals'

const Container = styled(VStack)`
  gap: 40px;
  max-width: 560px;
`

export const GoalsOnboardingStep = () => {
  return (
    <Container>
      <VStack gap={20}>
        <ManageDob />
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
