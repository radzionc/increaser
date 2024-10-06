import { Opener } from '@lib/ui/base/Opener'
import { FieldArrayAddButton } from '@lib/ui/form/components/FieldArrayAddButton'
import { CreateTaskFactoryForm } from '../../taskFactories/form/CreateTaskFactoryForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { ValueFinishProps } from '@lib/ui/props'

export const AddGoalTaskFactory = ({ onFinish }: ValueFinishProps<string>) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <FieldArrayAddButton onClick={onOpen}>Add a task</FieldArrayAddButton>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskFactoryForm
            onFinish={(taskFactory) => {
              onClose()
              if (taskFactory) {
                onFinish(taskFactory.id)
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
