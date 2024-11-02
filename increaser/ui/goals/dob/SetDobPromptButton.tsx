import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { SetDobOverlay } from './SetDobOverlay'

export const SetDobPromptButton = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Button kind="secondary" onClick={onOpen}>
            <EmojiTextPrefix emoji="🎂" />
            Add your birth date
          </Button>
        )
      }
      renderContent={({ onClose }) => <SetDobOverlay onFinish={onClose} />}
    />
  )
}
