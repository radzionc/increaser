import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useProjectFilter } from '../projects/filter/project/state/projectFilter'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'
import { CreateTaskFactoryForm } from './form/CreateTaskFactoryForm'

export const AddTaskFactory = () => {
  const [projectId] = useProjectFilter()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a recurring task" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskFactoryForm
            initialValue={projectId ? { projectId } : undefined}
            onFinish={onClose}
          />
        </PanelModal>
      )}
    />
  )
}
