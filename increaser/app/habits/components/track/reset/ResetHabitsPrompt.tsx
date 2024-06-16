import { Opener } from '@lib/ui/base/Opener'
import { useMyHabitsView } from '../../MyHabitsView'
import { Button } from '@lib/ui/buttons/Button'
import { ResetHabitsOverlay } from './ResetHabitsOverlay'
import { HStack } from '@lib/ui/layout/Stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'

export const ResetHabitsPrompt = () => {
  const [view] = useMyHabitsView()

  if (view !== 'track') {
    return null
  }

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button kind="secondary" onClick={onOpen}>
          <HStack alignItems="center" gap={8}>
            <IconWrapper>
              <RefreshIcon />
            </IconWrapper>
            Reset habit(s)
          </HStack>
        </Button>
      )}
      renderContent={({ onClose }) => <ResetHabitsOverlay onFinish={onClose} />}
    />
  )
}
