import { Opener } from '@lib/ui/base/Opener'
import { ProposeFeatureForm } from './ProposeFeatureForm'
import { PanelPrompt } from '@lib/ui/panel/PanelPrompt'

export const ProposeFeaturePrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        !isOpen && (
          <PanelPrompt onClick={onOpen} title="Make Increaser Yours">
            Tell us what feature you want to see next
          </PanelPrompt>
        )
      }
      renderContent={({ onClose }) => <ProposeFeatureForm onFinish={onClose} />}
    />
  )
}
