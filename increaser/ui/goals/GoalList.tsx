import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { useFilteredGoals } from '@increaser/ui/goals/filter/useFilteredGoals'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import {
  getGoalStatusFilterName,
  useGoalStatusFilter,
} from './filter/useGoalStatusFilter'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddGoal } from '@increaser/app/goals/AddGoal'
import { LearnMoreShyAction } from '@lib/ui/info/LearnMoreShyAction'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { EmptyState } from '@lib/ui/data/empty/EmptyState'

export const GoalList = () => {
  const items = useFilteredGoals()

  const [statusFilter, setStatusFilter] = useGoalStatusFilter()

  if (isEmpty(items)) {
    if (statusFilter) {
      return (
        <NoFilterMatches
          title={`There are no "${getGoalStatusFilterName(statusFilter)}" goals`}
          onRemove={() => setStatusFilter(null)}
          action={<AddGoal />}
        />
      )
    }

    return (
      <EmptyState
        title="Start with your first goal"
        action={
          <>
            <LearnMoreShyAction value="goals" />
            <AddGoal />
          </>
        }
      />
    )
  }

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
