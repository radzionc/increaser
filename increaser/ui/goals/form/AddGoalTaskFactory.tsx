import { Opener } from '@lib/ui/base/Opener'
import { FieldArrayAddButton } from '@lib/ui/form/components/FieldArrayAddButton'
import { TaskFormOverlay } from '../../tasks/form/TaskFormOverlay'
import { CreateTaskFactoryForm } from '../../taskFactories/form/CreateTaskFactoryForm'

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
        <TaskFormOverlay onFinish={onClose}>
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
        </TaskFormOverlay>
      )}
    />
  )
}
