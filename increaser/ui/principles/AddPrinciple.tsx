import { Opener } from '@lib/ui/base/Opener'
import { ListAddButton } from '@lib/ui/list/ListAddButton'
import { CreatePrincipleForm } from './form/CreatePrincipleForm'

export const AddPrinciple = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <ListAddButton onClick={onOpen} text="Add a principle" />
        )
      }
      renderContent={({ onClose }) => (
        <CreatePrincipleForm onFinish={onClose} />
      )}
    />
  )
}
