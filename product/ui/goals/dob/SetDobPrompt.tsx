import { Opener } from '@lib/ui/base/Opener'
import { PanelPrompt } from '@lib/ui/panel/PanelPrompt'

import { SetDobForm } from './SetDobForm'

export const SetDobPrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <PanelPrompt
            onClick={onOpen}
            title="Set your birthdate for age-based goals"
          >
            Customize goals by setting milestones based on your age.
          </PanelPrompt>
        )
      }
      renderContent={({ onClose }) => <SetDobForm onFinish={onClose} />}
    />
  )
}
