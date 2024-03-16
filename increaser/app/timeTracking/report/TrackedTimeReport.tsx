import { HStack, VStack } from '@lib/ui/layout/Stack'
import { ProjectSelector } from './ProjectSelector'
import { TimeGroupingSelector } from './TimeGroupingSelector'
import { IncludeCurrentPeriodSelector } from './IncludeCurrentPeriodSelector'
import { TimeFrameSelector } from './TimeFrameSelector'
import { TimeFrameStats } from './TimeFrameStats'
import { TimeChart } from './TimeChart'
import { UniformColumnGrid } from '@lib/ui/layout/UniformColumnGrid'

export const TrackedTimeReport = () => {
  return (
    <VStack gap={40}>
      <HStack alignItems="center" fullWidth wrap="wrap" gap={16}>
        <ProjectSelector />
        <TimeGroupingSelector />
        <TimeFrameSelector />
        <IncludeCurrentPeriodSelector />
      </HStack>
      <UniformColumnGrid gap={20} minChildrenWidth={200} maxChildrenWidth={200}>
        <TimeFrameStats />
      </UniformColumnGrid>
      <HStack fullWidth wrap="wrap" gap={40}>
        <TimeChart />
      </HStack>
    </VStack>
  )
}
