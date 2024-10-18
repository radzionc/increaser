import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { useCurrentHabit } from '../CurrentHabitProvider'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Opener } from '@lib/ui/base/Opener'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Text } from '@lib/ui/text'

export const ResetHabit = () => {
  const todayStartedAt = useStartOfDay()

  const { startedAt, id } = useCurrentHabit()

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')

  if (convertDuration(startedAt, 's', 'ms') >= todayStartedAt) {
    return null
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button kind="secondary" onClick={onOpen}>
          <HStack alignItems="center" gap={8}>
            <RefreshIcon />
            Reset habit
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <ConfirmationModal
          title="Confirm habit reset"
          onClose={onClose}
          confirmActionText="Reset"
          width={480}
          onConfirm={() => {
            updateHabit({
              id,
              fields: {
                startedAt: Math.round(convertDuration(Date.now(), 'ms', 's')),
                successes: [],
              },
            })
            onClose()
          }}
        >
          <Text color="contrast" weight="l">
            Are you sure you want to reset this habit? This will erase all
            tracked progress and start fresh from today.
          </Text>
        </ConfirmationModal>
      )}
    />
  )
}
