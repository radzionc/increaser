import { Opener } from '@lib/ui/base/Opener'
import { CreateVisionAttributeForm } from './form/CreateVisionAttributeForm'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddVisionAttribute = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <ListAddButton onClick={onOpen} text="Add life aspiration" />
        )
      }
      renderContent={({ onClose }) => (
        <CreateVisionAttributeForm onFinish={onClose} />
      )}
    />
  )
}
