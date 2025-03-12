import { PanelModal } from '@lib/ui/modal/PanelModal'
import { OnFinishProp } from '@lib/ui/props'

import { EditTaskFormContent } from './EditTaskFormContent'

export const EditTaskFormOverlay = ({ onFinish }: OnFinishProp) => {
  return (
    <PanelModal onFinish={onFinish}>
      <EditTaskFormContent onFinish={onFinish} />
    </PanelModal>
  )
}
