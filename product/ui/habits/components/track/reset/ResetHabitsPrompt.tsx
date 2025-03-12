import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { HStack } from '@lib/ui/css/stack'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { ConfirmationModal } from '@lib/ui/modal/ConfirmationModal'
import { Text } from '@lib/ui/text'
import { useActiveHabits } from '@product/ui/habits/hooks/useActiveHabits'
import { useUpdateUserEntitiesMutation } from '@product/ui/userEntity/api/useUpdateUserEntitiesMutation'

export const ResetHabitsPrompt = () => {
  const habits = useActiveHabits()

  const todayStartedAt = useStartOfDay()

  const areAllHabitsStartedToday = habits.every(
    ({ startedAt }) => startedAt >= todayStartedAt,
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
                  startedAt: Date.now(),
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
