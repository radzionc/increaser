import { Opener } from '@lib/ui/base/Opener'
import { FocusIconButton } from './FocusIconButton'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { EditTaskFormOverlay } from '@increaser/ui/tasks/form/EditTaskFormOverlay'

export const EditFocusTask = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <FocusIconButton
          title="Edit task"
          kind="secondary"
          icon={<EditIcon />}
          onClick={onOpen}
        />
      )}
      renderContent={({ onClose }) => (
        <EditTaskFormOverlay onFinish={onClose} />
      )}
    />
  )
}
