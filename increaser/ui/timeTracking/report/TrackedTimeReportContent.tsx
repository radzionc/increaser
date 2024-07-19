import { HStack, VStack } from '@lib/ui/layout/Stack'
import { ProjectsDistributionChart } from './ProjectsDistributionChart'
import { ProjectsDistributionBreakdown } from './ProjectsDistributionBreakdown'
import { RequiresTrackedTime } from './RequiresTrackedTime'
import { RequiresProjects } from './RequiresProjects'
import { TrackedTimeChart } from './TrackedTimeChart/TrackedTimeChart'

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
            justifyContent="center"
            alignItems="center"
          >
            <ProjectsDistributionChart />
          </VStack>
        </HStack>
        <TrackedTimeChart />
      </RequiresTrackedTime>
    </RequiresProjects>
  </VStack>
)
