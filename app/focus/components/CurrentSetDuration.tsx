import { useFocus } from 'focus/hooks/useFocus'
import { useState } from 'react'
import { Button } from '@increaser/ui/ui/buttons/Button'
import { Modal } from '@increaser/ui/ui/Modal'

import { FocusDurationInput } from './FocusDurationInput'

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
          kind="reversed"
          onClick={() => {
            setFocusDuration(value)
            onClose()
          }}
          size="l"
        >
          Update
        </Button>
      }
      title="Focus goal"
      onClose={onClose}
      renderContent={() => (
        <FocusDurationInput value={value} onChange={setValue} />
      )}
    />
  )
}
