import { Opener } from '@lib/ui/base/Opener'
import { CreateNoteForm } from './form/CreateNoteForm'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddNote = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : <ListAddButton onClick={onOpen} text="Add an idea" />
      }
      renderContent={({ onClose }) => <CreateNoteForm onFinish={onClose} />}
    />
  )
}
