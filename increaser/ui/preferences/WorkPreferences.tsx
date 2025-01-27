import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { ManageFinishWorkAt } from '@increaser/ui/schedule/ManageSchedule/ManageFinishWorkAt'
import { ManageWeekends } from '@increaser/ui/preferences/weekends/ManageWeekends'

import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const WorkPreferences = () => {
  return (
    <SeparatedByLine gap={20}>
      <ManageFinishWorkAt />
      <ManageWeekends />
      <ManageWorkBudget />
    </SeparatedByLine>
  )
}
