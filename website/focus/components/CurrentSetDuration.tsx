import { useFocus } from 'focus/hooks/useFocus'
import { useState } from 'react'
import { Button } from '@increaser/ui/buttons/Button'
import { Modal } from '@increaser/ui/modal'

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
      onSubmit={() => {
        setFocusDuration(value)
        onClose()
      }}
      footer={
        <Button kind="reversed" size="l">
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
