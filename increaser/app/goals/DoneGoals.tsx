import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { useMemo } from 'react'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { order } from '@lib/utils/array/order'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { CurrentGoalProvider } from '@increaser/ui/goals/CurrentGoalProvider'
import { GoalItem } from '@increaser/ui/goals/GoalItem'

export const DoneGoals = () => {
  const { goals, dob } = useAssertUserState()
  const items = useMemo(() => {
    return order(
      Object.values(goals).filter((goal) => goal.status === 'done'),
      ({ deadlineAt }) => getGoalDeadlineTimestamp({ dob, value: deadlineAt }),
      'desc',
    )
  }, [dob, goals])

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
