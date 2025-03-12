import { Panel } from '@lib/ui/css/panel'

import { SelectedPeriodAverage } from './average/SelectedPeriodAverage'
import { NonEmptyIntervalOnly } from './interval/NonEmptyIntervalOnly'
import { ProjectsNavigation } from './projects/ProjectsNavigation'

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
