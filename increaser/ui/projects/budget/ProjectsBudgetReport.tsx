import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { Panel } from '@lib/ui/panel/Panel'
import { CurrentWeekProgress } from '@increaser/ui/projects/budget/CurrentWeekProgress'
import { PreviousWeeksProgress } from '@increaser/ui/projects/budget/PreviousWeeks/PreviousWeeksProgress'

export const ProjectsBudgetReport = () => (
  <Panel kind="secondary">
    <SeparatedByLine gap={40}>
      <CurrentWeekProgress />
      <PreviousWeeksProgress />
    </SeparatedByLine>
  </Panel>
)
