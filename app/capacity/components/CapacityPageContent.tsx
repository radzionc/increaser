import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import styled from 'styled-components'
import { SameWidthChildrenRow } from '@increaser/ui/Layout/SameWidthChildrenRow'
import { VStack } from '@increaser/ui/layout/Stack'

import { CurrentWeekPerformance } from './CurrentWeekPerformance'
import { ManageCapacity } from './ManageCapacity'
import { ManageGoals } from './ManageGoals'
import { PreviousCapacity } from './PreviousCapacity'
import { Panel } from '@increaser/ui/panel/Panel'

const Container = styled(SameWidthChildrenRow)`
  align-items: start;
`

export const CapacityPageContent = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallbackCard />}>
      <Container gap={20} minChildrenWidth={320}>
        <VStack gap={20}>
          <CurrentWeekPerformance />
        </VStack>
        <VStack fullWidth gap={20}>
          <Panel kind="secondary" withSections>
            <ManageCapacity />
            <ManageGoals />
          </Panel>
          <PreviousCapacity />
        </VStack>
      </Container>
    </ErrorBoundary>
  )
}
