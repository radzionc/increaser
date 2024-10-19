import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useProjectFilter } from '../projects/filter/project/state/projectFilter'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'
import { CreateTaskTemplateForm } from './form/CreateTaskTemplateForm'

export const AddTaskTemplate = () => {
  const [projectId] = useProjectFilter()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a template" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskTemplateForm
            initialValue={projectId ? { projectId } : undefined}
            onFinish={onClose}
          />
        </PanelModal>
      )}
    />
  )
}
