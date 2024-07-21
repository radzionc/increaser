import { Opener } from '@lib/ui/base/Opener'
import { ListAddButton } from '@lib/ui/list/ListAddButton'
import { CreateTaskTemplateForm } from './form/CreateTaskTemplateForm'

export const AddTaskTemplate = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <ListAddButton onClick={onOpen} text="Add a task template" />
        )
      }
      renderContent={({ onClose }) => (
        <CreateTaskTemplateForm onFinish={onClose} />
      )}
    />
  )
}
