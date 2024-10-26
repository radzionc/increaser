import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { useCurrentHabit } from '../CurrentHabitProvider'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { Opener } from '@lib/ui/base/Opener'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Text } from '@lib/ui/text'
import { CircleStopIcon } from '@lib/ui/icons/CircleStopIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'

export const ManageHabitStatus = () => {
  const { id, startedAt } = useCurrentHabit()

  const { mutate: updateHabit } = useUpdateUserEntityMutation('habit')

  const isActive = startedAt !== null

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button
          kind="secondary"
          onClick={() => {
            if (isActive) {
              onOpen()
            } else {
              updateHabit({
                id,
                fields: {
                  startedAt: Date.now(),
                },
              })
            }
          }}
        >
          <HStack alignItems="center" gap={8}>
            {isActive ? <CircleStopIcon /> : <PlayIcon />}
            {isActive ? 'Stop tracking' : 'Start tracking'}
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <ConfirmationModal
          title="Confirm habit stop"
          onClose={onClose}
          confirmActionText="Stop"
          width={480}
          onConfirm={() => {
            updateHabit({
              id,
              fields: {
                startedAt: null,
                successes: [],
              },
            })
            onClose()
          }}
        >
          <Text color="contrast" weight="l">
            Are you sure you want to stop tracking this habit? This will clear
            all progress and reset its history. You can start tracking it again
            anytime.
          </Text>
        </ConfirmationModal>
      )}
    />
  )
}
