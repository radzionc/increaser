import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUpdateUserEntitiesMutation } from '@increaser/ui/userEntity/api/useUpdateUserEntitiesMutation'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Text } from '@lib/ui/text'
import { Opener } from '@lib/ui/base/Opener'
import { useHabits } from '@increaser/ui/habits/hooks/useHabits'

export const ResetHabitsPrompt = () => {
  const habits = useHabits()

  const todayStartedAt = useStartOfDay()

  const areAllHabitsStartedToday = habits.every(
    ({ startedAt }) => convertDuration(startedAt, 's', 'ms') >= todayStartedAt,
  )

  const { mutate: updateHabits } = useUpdateUserEntitiesMutation('habit')

  if (areAllHabitsStartedToday) {
    return null
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button kind="secondary" size="s" onClick={onOpen}>
          <HStack alignItems="center" gap={8}>
            <IconWrapper>
              <RefreshIcon />
            </IconWrapper>
            Reset habits
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <ConfirmationModal
          title="Confirm habits reset"
          onClose={onClose}
          confirmActionText="Reset"
          width={480}
          onConfirm={() => {
            updateHabits(
              habits.map(({ id }) => ({
                id,
                fields: {
                  startedAt: convertDuration(Date.now(), 'ms', 's'),
                  successes: [],
                },
              })),
            )
            onClose()
          }}
        >
          <Text color="contrast" weight="l">
            Are you sure you want to reset all habits? This will erase all
            tracked progress and start fresh from today.
          </Text>
        </ConfirmationModal>
      )}
    />
  )
}
