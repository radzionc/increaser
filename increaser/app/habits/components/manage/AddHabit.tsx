import { Opener } from '@lib/ui/base/Opener'
import { CreateHabitForm } from './form/CreateHabitForm'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddHabit = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : <ListAddButton onClick={onOpen} text="Add a habit" />
      }
      renderContent={({ onClose }) => <CreateHabitForm onFinish={onClose} />}
    />
  )
}
