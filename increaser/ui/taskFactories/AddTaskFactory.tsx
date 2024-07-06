import { Opener } from '@lib/ui/base/Opener'
import { ListAddButton } from '@lib/ui/list/ListAddButton'
import { CreateTaskFactoryForm } from './form/CreateTaskFactoryForm'

export const AddTaskFactory = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <ListAddButton onClick={onOpen} text="Add a recurring task" />
        )
      }
      renderContent={({ onClose }) => (
        <CreateTaskFactoryForm onFinish={onClose} />
      )}
    />
  )
}
