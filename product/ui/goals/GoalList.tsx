import { EmptyState } from '@lib/ui/data/empty/EmptyState'
import { NoFilterMatches } from '@lib/ui/data/filter/NoFilterMatches'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddGoal } from '@product/app/goals/AddGoal'
import { CurrentGoalProvider } from '@product/ui/goals/CurrentGoalProvider'
import { useFilteredGoals } from '@product/ui/goals/filter/useFilteredGoals'
import { GoalItem } from '@product/ui/goals/GoalItem'
import { LearnMoreShyAction } from '@product/ui/info/LearnMoreShyAction'

import {
  getGoalStatusFilterName,
  useGoalStatusFilter,
} from './filter/useGoalStatusFilter'

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
