import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { SetDobOverlay } from './SetDobOverlay'

export const SetDobPromptButton = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Button kind="secondary" type="button" onClick={onOpen}>
            <EmojiTextPrefix emoji="🎂" />
            Set your birthdate
          </Button>
        )
      }
      renderContent={({ onClose }) => <SetDobOverlay onFinish={onClose} />}
    />
  )
}
