import { ErrorBoundary } from '@increaser/app/errors/components/ErrorBoundary'
import { ErrorFallbackCard } from '@increaser/app/errors/components/ErrorFallbackCard'
import styled from 'styled-components'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { VStack } from '@lib/ui/layout/Stack'

import { CurrentWeekPerformance } from './CurrentWeekPerformance'
import { ManageCapacity } from './ManageCapacity'
import { ManageGoals } from './ManageGoals'
import { Panel } from '@lib/ui/panel/Panel'
import { TimeDistributionPanel } from '@increaser/ui/timeTracking/TimeDistributionPanel'

const Container = styled(UniformColumnGrid)`
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
          <TimeDistributionPanel />
        </VStack>
      </Container>
    </ErrorBoundary>
  )
}
