import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { GoalsTimeline } from '@increaser/ui/goals/timeline/GoalsTimeline'
import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useFilteredGoals } from '@increaser/ui/goals/filter/useFilteredGoals'

export const Goals = () => {
  const items = useFilteredGoals()

  return (
    <>
      <GoalsTimeline />
      <VStack>
        <ActiveItemIdProvider initialValue={null}>
          {items.map((item) => (
            <CurrentGoalProvider key={item.id} value={item}>
              <GoalItem />
            </CurrentGoalProvider>
          ))}
          <AddGoal />
        </ActiveItemIdProvider>
      </VStack>
    </>
  )
}
