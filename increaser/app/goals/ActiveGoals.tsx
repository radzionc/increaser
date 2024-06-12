import { VStack } from '@lib/ui/layout/Stack'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { Goals } from '@increaser/ui/goals/Goals'
import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'

export const ActiveGoals = () => {
  return (
    <>
      <GoalsTimeline />
      <ProductEducationBlock value="goals" />
      <VStack>
        <ActiveItemIdProvider initialValue={null}>
          <Goals />
          <AddGoal />
        </ActiveItemIdProvider>
      </VStack>
    </>
  )
}
