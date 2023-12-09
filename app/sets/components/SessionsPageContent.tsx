import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import styled from 'styled-components'
import { Spacer } from '@increaser/ui/layout/Spacer'
import { HStack, VStack } from '@increaser/ui/layout/Stack'

import { GroupedByDaySessions } from './DailyReport/GroupedByDaySessions'

const Container = styled(HStack)`
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

export const SessionsPageContent = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallbackCard />}>
      <Container fullWidth gap={60}>
        <VStack fullWidth>
          <GroupedByDaySessions />
        </VStack>
      </Container>
      <Spacer />
    </ErrorBoundary>
  )
}
