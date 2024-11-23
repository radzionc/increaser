import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { useFilteredGoals } from '@increaser/ui/goals/filter/useFilteredGoals'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

export const GoalList = () => {
  const items = useFilteredGoals()

  return (
    <SeparatedByLine gap={4}>
      {items.map((item) => (
        <div key={item.id}>
          <CurrentGoalProvider value={item}>
            <GoalItem />
          </CurrentGoalProvider>
        </div>
      ))}
    </SeparatedByLine>
  )
}
