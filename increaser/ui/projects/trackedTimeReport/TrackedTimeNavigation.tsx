import { Panel } from '@lib/ui/css/panel'
import { ProjectsNavigation } from './projects/ProjectsNavigation'
import { DataSizeSelector } from './dataSize/DataSizeSelector'
import { TimeGroupingSelector } from './timeGrouping/TimeGroupingSelector'
import { CurrentPeriodSelector } from './currentPeriod/CurrentPeriodSelector'

export const TrackedTimeNavigation = () => {
  return (
    <Panel withSections kind="secondary">
      <TimeGroupingSelector />
      <CurrentPeriodSelector />
      <DataSizeSelector />
      <ProjectsNavigation />
    </Panel>
  )
}
