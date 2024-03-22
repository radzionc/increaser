import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TimeChart } from './TimeChart'
import { ProjectsDistributionChart } from './ProjectsDistributionChart'
import { ProjectsDistributionBreakdown } from './ProjectsDistributionBreakdown'
import { ReportFilters } from './ReportFilters'
import { RequiresTrackedTime } from './RequiresTrackedTime'
import { RequiresTwoDataPoints } from './RequiresTwoDataPoints'
import { RequiresProjects } from './RequiresProjects'
import { Panel } from '@lib/ui/panel/Panel'
import { TrackedTimeReportTitle } from './TrackedTimeReportTitle'

export const TrackedTimeReport = () => {
  return (
    <VStack gap={16}>
      <HStack
        wrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        fullWidth
        gap={20}
      >
        <TrackedTimeReportTitle />
        <ReportFilters />
      </HStack>
      <Panel kind="secondary">
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
                <TimeChart />
              </RequiresTwoDataPoints>
            </RequiresTrackedTime>
          </RequiresProjects>
        </VStack>
      </Panel>
    </VStack>
  )
}
