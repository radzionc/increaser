import { goalToFinishWorkByEmoji, goalToStartWorkAtEmoji } from 'sets/constants'
import { useUpdateGoalToFinishWorkByMutation } from 'sets/hooks/useUpdateGoalToFinishWorkBy'
import { useUpdateGoalToGoToBedAtMutation } from 'sets/hooks/useUpdateGoalToGoToBedAt'
import { useUpdateGoalToStartWorkAtMutation } from 'sets/hooks/useUpdateGoalToStartWorkAtMutation'
import { VStack } from '@increaser/ui/ui/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MIN_IN_DAY, MIN_IN_HOUR } from 'utils/time'

import { ManageTimeBoundary } from './ManageTimeBoundary'
import { TimeDistance } from './TimeDistance'

export const ManageWorkSchedule = () => {
  const { goalToStartWorkAt, goalToFinishWorkBy, goalToGoToBedAt } =
    useAssertUserState()

  const { mutate: setGoalToStartWorkAt } = useUpdateGoalToStartWorkAtMutation()

  const { mutate: setGoalToFinishWorkBy } =
    useUpdateGoalToFinishWorkByMutation()

  const { mutate: setGoalToGoToBedAt } = useUpdateGoalToGoToBedAtMutation()

  return (
    <VStack gap={4}>
      <ManageTimeBoundary
        emoji={goalToStartWorkAtEmoji}
        text="Start work around"
        value={goalToStartWorkAt}
        max={goalToFinishWorkBy}
        onChange={setGoalToStartWorkAt}
        min={0}
      />
      <TimeDistance
        style={{ height: 100 }}
        value={goalToFinishWorkBy - goalToStartWorkAt}
        kind="regular"
        text="for work"
      />
      <ManageTimeBoundary
        emoji={goalToFinishWorkByEmoji}
        text="Finish work by"
        value={goalToFinishWorkBy}
        max={goalToGoToBedAt}
        onChange={setGoalToFinishWorkBy}
        min={goalToStartWorkAt}
      />
      <TimeDistance
        style={{ height: 100 }}
        value={goalToGoToBedAt - goalToFinishWorkBy}
        kind={
          goalToGoToBedAt - goalToFinishWorkBy < MIN_IN_HOUR
            ? 'alert'
            : 'success'
        }
        text="for rest"
      />
      <ManageTimeBoundary
        emoji="🌙"
        text="Go to bed at"
        value={goalToGoToBedAt}
        max={MIN_IN_DAY}
        onChange={setGoalToGoToBedAt}
        min={goalToFinishWorkBy}
      />
    </VStack>
  )
}
