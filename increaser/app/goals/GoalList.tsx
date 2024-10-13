import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { useFilteredGoals } from '@increaser/ui/goals/filter/useFilteredGoals'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { VStack } from '@lib/ui/css/stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'

export const GoalList = () => {
  const items = useFilteredGoals()

  return (
    <VStack>
      <ActiveItemIdProvider initialValue={null}>
        {items.map((item) => (
          <CurrentGoalProvider key={item.id} value={item}>
            <GoalItem />
          </CurrentGoalProvider>
        ))}
      </ActiveItemIdProvider>
    </VStack>
  )
}
