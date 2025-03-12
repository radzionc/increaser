import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { ManageWeekends } from '@product/ui/preferences/weekends/ManageWeekends'
import { ManageFinishWorkAt } from '@product/ui/schedule/ManageSchedule/ManageFinishWorkAt'
import { ManageWorkBudget } from '@product/ui/workBudget/ManageWorkBudget'

export const WorkPreferences = () => {
  return (
    <SeparatedByLine gap={20}>
      <ManageFinishWorkAt />
      <ManageWeekends />
      <ManageWorkBudget />
    </SeparatedByLine>
  )
}
