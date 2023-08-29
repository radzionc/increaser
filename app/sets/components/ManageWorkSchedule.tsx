import { goalToFinishWorkByEmoji, goalToStartWorkAtEmoji } from 'sets/constants'
import { VStack } from '@increaser/ui/ui/Stack'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MIN_IN_DAY, MIN_IN_HOUR } from '@increaser/utils/time'

import { ManageTimeBoundary } from './ManageTimeBoundary'
import { TimeDistance } from './TimeDistance'
import { useUpdateUserMutation } from 'user/mutations/useUpdateUserMutation'

export const ManageWorkSchedule = () => {
  const { goalToStartWorkAt, goalToFinishWorkBy, goalToGoToBedAt } =
    useAssertUserState()

  const { mutate: updateUser } = useUpdateUserMutation()

  return (
    <VStack gap={4}>
      <ManageTimeBoundary
        emoji={goalToStartWorkAtEmoji}
        text="Start work around"
        value={goalToStartWorkAt}
        max={goalToFinishWorkBy}
        onChange={(goalToStartWorkAt) => {
          updateUser({
            goalToStartWorkAt,
          })
        }}
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
        onChange={(goalToFinishWorkBy) => {
          updateUser({
            goalToFinishWorkBy,
          })
        }}
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
        onChange={(goalToGoToBedAt) => {
          updateUser({
            goalToGoToBedAt,
          })
        }}
        min={goalToFinishWorkBy}
      />
    </VStack>
  )
}
