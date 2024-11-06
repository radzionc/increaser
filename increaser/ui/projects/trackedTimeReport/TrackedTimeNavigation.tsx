import { Panel } from '@lib/ui/css/panel'
import { ProjectsNavigation } from './projects/ProjectsNavigation'

export const TrackedTimeNavigation = () => {
  return (
    <Panel withSections kind="secondary">
      <ProjectsNavigation />
    </Panel>
  )
}
