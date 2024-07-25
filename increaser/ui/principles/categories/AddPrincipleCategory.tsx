import { Opener } from '@lib/ui/base/Opener'
import { CreatePrincipleCategoryForm } from './form/CreatePrincipleCategoryForm'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddPrincipleCategory = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : <ListAddButton onClick={onOpen} text="Add a category" />
      }
      renderContent={({ onClose }) => (
        <CreatePrincipleCategoryForm onFinish={onClose} />
      )}
    />
  )
}
