import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TimeChart } from './TimeChart'
import { ProjectsDistributionChart } from './ProjectsDistributionChart'
import { ProjectsDistributionBreakdown } from './ProjectsDistributionBreakdown'
import { ReportFilters } from './ReportFilters'
import { RequiresTrackedTime } from './RequiresTrackedTime'
import { RequiresTwoDataPoints } from './RequiresTwoDataPoints'
import { RequiresProjects } from './RequiresProjects'

export const TrackedTimeReport = () => {
  return (
    <VStack gap={60}>
      <ReportFilters />
      <VStack gap={40}>
        <RequiresProjects>
          <RequiresTrackedTime>
            <HStack
              justifyContent="space-between"
              gap={40}
              fullWidth
              wrap="wrap"
            >
              <ProjectsDistributionBreakdown />
              <ProjectsDistributionChart />
            </HStack>
            <RequiresTwoDataPoints>
              <TimeChart />
            </RequiresTwoDataPoints>
          </RequiresTrackedTime>
        </RequiresProjects>
      </VStack>
    </VStack>
  )
}
