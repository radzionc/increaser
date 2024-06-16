import { VStack } from '@lib/ui/layout/Stack'
import { GoalItem } from './GoalItem'
import { CurrentGoalProvider } from './CurrentGoalProvider'
import { useActiveGoals } from './hooks/useActiveGoals'

export const Goals = () => {
  const items = useActiveGoals()

  return (
    <VStack>
      {items.map((item) => (
        <CurrentGoalProvider key={item.id} value={item}>
          <GoalItem />
        </CurrentGoalProvider>
      ))}
    </VStack>
  )
}
