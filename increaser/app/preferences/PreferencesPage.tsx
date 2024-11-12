import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { ManageFinishWorkAt } from '@increaser/ui/schedule/ManageSchedule/ManageFinishWorkAt'
import { ManageWeekends } from '@increaser/ui/preferences/weekends/ManageWeekends'

import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const PreferencesPage = () => {
  return (
    <SeparatedByLine gap={20} style={{ maxWidth: 520 }}>
      <ManageFinishWorkAt />
      <ManageWeekends />
      <ManageWorkBudget />
    </SeparatedByLine>
  )
}
