import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { GoalItem } from '@increaser/ui/goals/GoalItem'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { ShyInfoBlock } from '@lib/ui/info/ShyInfoBlock'
import { useGoals } from '@increaser/ui/goals/hooks/useGoals'

export const DoneGoals = () => {
  const goals = useGoals()
  const items = useMemo(
    () => goals.filter((goal) => goal.status === 'done'),
    [goals],
  )

  if (isEmpty(items)) {
    return (
      <ShyInfoBlock>There are no completed goals yet. Keep going!</ShyInfoBlock>
    )
  }

  return (
    <VStack>
      <ActiveItemIdProvider initialValue={null}>
        {items.map((goal) => (
          <CurrentGoalProvider value={goal} key={goal.id}>
            <GoalItem />
          </CurrentGoalProvider>
        ))}
      </ActiveItemIdProvider>
    </VStack>
  )
}
