import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { useHabits } from '@increaser/ui/habits/HabitsContext'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUpdateUserEntitiesMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntitiesMutation'

export const ResetHabitsPrompt = () => {
  const { habits } = useHabits()

  const todayStartedAt = useStartOfDay()

  const areAllHabitsStartedToday = habits.every(
    ({ startedAt }) => convertDuration(startedAt, 's', 'ms') >= todayStartedAt,
  )

  const { mutate: updateHabits } = useUpdateUserEntitiesMutation('habit')

  if (areAllHabitsStartedToday) {
    return null
  }

  return (
    <Button
      kind="secondary"
      size="s"
      onClick={() => {
        updateHabits(
          habits.map(({ id }) => ({
            id,
            fields: {
              startedAt: convertDuration(Date.now(), 'ms', 's'),
              successes: [],
            },
          })),
        )
      }}
    >
      <HStack alignItems="center" gap={8}>
        <IconWrapper>
          <RefreshIcon />
        </IconWrapper>
        Reset habits
      </HStack>
    </Button>
  )
}
