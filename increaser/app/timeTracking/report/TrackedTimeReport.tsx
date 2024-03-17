import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TimeChart } from './TimeChart'
import { ProjectsDistributionChart } from './ProjectsDistributionChart'
import { ProjectsDistributionBreakdown } from './ProjectsDistributionBreakdown'
import { ReportFilters } from './ReportFilters'

export const TrackedTimeReport = () => {
  return (
    <VStack gap={40}>
      <HStack gap={40} fullWidth wrap="wrap">
        <ReportFilters />
        <ProjectsDistributionBreakdown />
        <ProjectsDistributionChart />
      </HStack>
      <TimeChart />
    </VStack>
  )
}
