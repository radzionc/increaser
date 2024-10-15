import { CurrentWeekProgress } from '@increaser/ui/projects/budget/CurrentWeekProgress'
import { VStack } from '@lib/ui/css/stack'
import { BudgetRequired } from './BudgetRequired'

export const ProjectsBudgetReport = () => {
  return (
    <VStack gap={20}>
      <BudgetRequired>
        <CurrentWeekProgress />
      </BudgetRequired>
    </VStack>
  )
}
