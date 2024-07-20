import { Opener } from '@lib/ui/base/Opener'
import { CreateIdeaForm } from './form/CreateIdeaForm'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddIdea = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : <ListAddButton onClick={onOpen} text="Add an idea" />
      }
      renderContent={({ onClose }) => <CreateIdeaForm onFinish={onClose} />}
    />
  )
}
