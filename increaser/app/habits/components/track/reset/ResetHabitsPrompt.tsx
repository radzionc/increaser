import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { ResetHabitsOverlay } from './ResetHabitsOverlay'
import { HStack } from '@lib/ui/layout/Stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'

export const ResetHabitsPrompt = () => {
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
      renderContent={({ onClose }) => <ResetHabitsOverlay onFinish={onClose} />}
    />
  )
}
