import { Panel } from '@lib/ui/panel/Panel'
import { IncludeCurrentPeriodSelector } from './filters/IncludeCurrentPeriodSelector'
import { ProjectsDistributionBreakdown } from './ProjectsDistributionBreakdown'
import { TimeFrameManager } from './TimeFrameManager'

export const TrackedTimeNavigation = () => {
  return (
    <Panel withSections kind="secondary">
      <TimeFrameManager />
      <IncludeCurrentPeriodSelector />
      <ProjectsDistributionBreakdown />
    </Panel>
  )
}
