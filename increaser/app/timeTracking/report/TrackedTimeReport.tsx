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
import { ManageProjectsNamesVisibility } from './ManageProjectsNamesVisibility'

export const TrackedTimeReport = () => {
  return (
    <VStack gap={16}>
      <HStack wrap="wrap" alignItems="center" fullWidth gap={8}>
        <HStack
          wrap="wrap"
          justifyContent="space-between"
          alignItems="center"
          gap={20}
          style={{ flex: 1 }}
        >
          <TrackedTimeReportTitle />
          <ReportFilters />
        </HStack>
        <ManageProjectsNamesVisibility />
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
