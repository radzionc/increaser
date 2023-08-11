import { ErrorBoundary } from 'errors/components/ErrorBoundary'
import { ErrorFallbackCard } from 'errors/components/ErrorFallbackCard'
import styled from 'styled-components'
import { Spacer } from '@increaser/ui/ui/Spacer'
import { HStack, VStack } from '@increaser/ui/ui/Stack'

import { GroupedByDaySessions } from './DailyReport/GroupedByDaySessions'
import { ManageWorkSchedule } from './ManageWorkSchedule'

const Container = styled(HStack)`
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`

export const SessionsPageContent = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallbackCard />}>
      <Container fullWidth gap={60}>
        <ManageWorkSchedule />
        <VStack fullWidth>
          <GroupedByDaySessions />
        </VStack>
      </Container>
      <Spacer />
    </ErrorBoundary>
  )
}
