import { Opener } from '@lib/ui/base/Opener'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { EditTaskFormOverlay } from '@product/ui/tasks/form/EditTaskFormOverlay'

import { FocusIconButton } from './FocusIconButton'

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
