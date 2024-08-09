import { Panel } from '@lib/ui/panel/Panel'
import { IncludeCurrentPeriodSelector } from './filters/IncludeCurrentPeriodSelector'
import { TimeFrameManager } from './TimeFrameManager'
import { ProjectsNavigation } from './projects/ProjectsNavigation'

export const TrackedTimeNavigation = () => {
  return (
    <Panel withSections kind="secondary">
      <TimeFrameManager />
      <IncludeCurrentPeriodSelector />
      <ProjectsNavigation />
    </Panel>
  )
}
