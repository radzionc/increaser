import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { useCurrentHabit } from '../CurrentHabitProvider'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const ResetHabit = () => {
  const todayStartedAt = useStartOfDay()

  const { startedAt, id } = useCurrentHabit()

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')

  if (convertDuration(startedAt, 's', 'ms') >= todayStartedAt) {
    return null
  }

  return (
    <Button
      onClick={() => {
        updateHabit({
          id,
          fields: {
            startedAt: Math.round(convertDuration(Date.now(), 'ms', 's')),
            successes: [],
          },
        })
      }}
      kind="secondary"
    >
      <HStack alignItems="center" gap={8}>
        <RefreshIcon />
        Reset habit
      </HStack>
    </Button>
  )
}
