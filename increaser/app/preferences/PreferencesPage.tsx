import { ManageWorkBudget } from '@increaser/ui/workBudget/ManageWorkBudget'
import { ManageFinishWorkAt } from '@increaser/ui/schedule/ManageSchedule/ManageFinishWorkAt'

import { VStack } from '@lib/ui/css/stack'

export const PreferencesPage = () => {
  return (
    <VStack gap={40} style={{ maxWidth: 560 }}>
      <ManageFinishWorkAt />
      <ManageWorkBudget />
    </VStack>
  )
}
