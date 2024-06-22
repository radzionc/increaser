import { Opener } from '@lib/ui/base/Opener'
import { CreateGoalForm } from './form/CreateGoalForm'
import { ListAddButton } from '@lib/ui/list/ListAddButton'

export const AddGoal = () => {
  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : <ListAddButton onClick={onOpen} text="Add goal" />
      }
      renderContent={({ onClose }) => <CreateGoalForm onFinish={onClose} />}
    />
  )
}
