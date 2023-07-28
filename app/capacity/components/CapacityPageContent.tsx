import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import styled from 'styled-components'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { VStack } from '@increaser/ui/ui/Stack'
import { AllocationOnboarding } from 'weekTimeAllocation/components/AllocationOnboarding'

import { CurrentWeekPerformance } from './CurrentWeekPerformance'
import { ManageCapacity } from './ManageCapacity'
import { ManageGoals } from './ManageGoals'
import { PreviousCapacity } from './PreviousCapacity'

const Container = styled(SameWidthChildrenRow)`
  align-items: start;
`

export const CapacityPageContent = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallbackCard />}>
      <AllocationOnboarding />
      <Container gap={20} minChildrenWidth={320}>
        <CurrentWeekPerformance />
        <VStack fullWidth gap={20}>
          <ManageCapacity />
          <ManageGoals />
          <PreviousCapacity />
        </VStack>
      </Container>
    </ErrorBoundary>
  )
}
