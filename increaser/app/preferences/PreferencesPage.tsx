import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { ManageFinishWorkAt } from '@increaser/ui/schedule/ManageSchedule/ManageFinishWorkAt'
import { ManageWeekends } from '@increaser/ui/preferences/weekends/ManageWeekends'

import { VStack } from '@lib/ui/css/stack'

export const PreferencesPage = () => {
  return (
    <VStack gap={40} style={{ maxWidth: 560 }}>
      <ManageFinishWorkAt />
      <ManageWeekends />
      <ManageWorkBudget />
    </VStack>
  )
}
