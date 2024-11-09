import { Panel } from '@lib/ui/css/panel'
import { ProjectsNavigation } from './projects/ProjectsNavigation'
import { SelectedPeriodAverage } from './average/SelectedPeriodAverage'
import { NonEmptyIntervalOnly } from './interval/NonEmptyIntervalOnly'

export const TrackedTimeSummary = () => {
  return (
    <Panel withSections kind="secondary">
      <NonEmptyIntervalOnly>
        <SelectedPeriodAverage />
      </NonEmptyIntervalOnly>
      <ProjectsNavigation />
    </Panel>
  )
}
