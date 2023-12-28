import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { useState } from 'react'
import { Button } from '@lib/ui/buttons/Button'

import { FocusDurationInput } from './FocusDurationInput'
import { Modal } from '@lib/ui/modal'

interface UpdateFocusDurationOverlayProps {
  onClose: () => void
}

export const UpdateFocusDurationOverlay = ({
  onClose,
}: UpdateFocusDurationOverlayProps) => {
  const { focusDuration, setFocusDuration } = useFocus()

  const [value, setValue] = useState(focusDuration)

  return (
    <Modal
      footer={
        <Button
          onClick={() => {
            setFocusDuration(value)
            onClose()
          }}
          kind="reversed"
          size="l"
        >
          Update
        </Button>
      }
      title="Focus goal"
      onClose={onClose}
    >
      <FocusDurationInput value={value} onChange={setValue} />
    </Modal>
  )
}
