import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useProjectFilter } from '../projects/filter/project/state/projectFilter'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'
import { CreateTaskForm } from './form/CreateTaskForm'

export const AddTask = () => {
  const [projectId] = useProjectFilter()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a task" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskForm
            initialValue={projectId ? { projectId } : undefined}
            onFinish={onClose}
          />
        </PanelModal>
      )}
    />
  )
}
