import { Panel } from '@lib/ui/css/panel'
import { ProjectsNavigation } from './projects/ProjectsNavigation'
import { TimeGroupingSelector } from './timeGrouping/TimeGroupingSelector'

export const TrackedTimeNavigation = () => {
  return (
    <Panel withSections kind="secondary">
      <TimeGroupingSelector />
      <ProjectsNavigation />
    </Panel>
  )
}
