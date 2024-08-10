import { Panel } from '@lib/ui/panel/Panel'
import { IncludeCurrentPeriodSelector } from './filters/IncludeCurrentPeriodSelector'
import { ProjectsNavigation } from './projects/ProjectsNavigation'
import { TimeGroupSelector } from './TimeGoupSelector'
import { DataSizeSelector } from './DataSizeSelector'

export const TrackedTimeNavigation = () => {
  return (
    <Panel withSections kind="secondary">
      <TimeGroupSelector />
      <IncludeCurrentPeriodSelector />
      <DataSizeSelector />
      <ProjectsNavigation />
    </Panel>
  )
}
