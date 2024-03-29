import { HStack, VStack } from '@lib/ui/layout/Stack'
import { ProjectsDistributionChart } from './ProjectsDistributionChart'
import { ProjectsDistributionBreakdown } from './ProjectsDistributionBreakdown'
import { RequiresTrackedTime } from './RequiresTrackedTime'
import { RequiresTwoDataPoints } from './RequiresTwoDataPoints'
import { RequiresProjects } from './RequiresProjects'
import { ProjectsTimeSeriesChart } from './ProjectsTimeSeriesChart/ProjectsTimeSeriesChart'

export const TrackedTimeReportContent = () => (
  <VStack gap={20}>
    <RequiresProjects>
      <RequiresTrackedTime>
        <HStack
          justifyContent="space-between"
          gap={40}
          fullWidth
          wrap="wrap"
          alignItems="center"
        >
          <ProjectsDistributionBreakdown />
          <VStack
            style={{ flex: 1 }}
            fullHeight
            justifyContent="center"
            alignItems="center"
          >
            <ProjectsDistributionChart />
          </VStack>
        </HStack>
        <RequiresTwoDataPoints>
          <ProjectsTimeSeriesChart />
        </RequiresTwoDataPoints>
      </RequiresTrackedTime>
    </RequiresProjects>
  </VStack>
)
