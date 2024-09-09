import { NoValueFinishProps } from '@lib/ui/props'
import { EditTaskFormContent } from './EditTaskFormContent'
import { PanelModal } from '@lib/ui/modal/PanelModal'

export const EditTaskFormOverlay = ({ onFinish }: NoValueFinishProps) => {
  return (
    <PanelModal onFinish={onFinish}>
      <EditTaskFormContent onFinish={onFinish} />
    </PanelModal>
  )
}
