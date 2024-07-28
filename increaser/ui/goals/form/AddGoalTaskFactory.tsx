import { Opener } from '@lib/ui/base/Opener'
import { FieldArrayAddButton } from '@lib/ui/form/components/FieldArrayAddButton'
import { CreateTaskFactoryForm } from '../../taskFactories/form/CreateTaskFactoryForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'

type AddGoalTaskFactoryProps = {
  onFinish: (id: string) => void
}

export const AddGoalTaskFactory = ({ onFinish }: AddGoalTaskFactoryProps) => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <FieldArrayAddButton onClick={onOpen}>Add a task</FieldArrayAddButton>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskFactoryForm
            onFinish={(id) => {
              // wait for mutation to finish
              if (id) return

              onClose()
            }}
            onMutationFinish={(id) => {
              onClose()
              if (id) {
                onFinish(id)
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
