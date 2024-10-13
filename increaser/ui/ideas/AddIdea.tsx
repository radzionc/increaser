import { Opener } from '@lib/ui/base/Opener'
import { CreateIdeaForm } from './form/CreateIdeaForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useProjectFilter } from '../projects/filter/project/state/projectFilter'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'

export const AddIdea = () => {
  const [projectId] = useProjectFilter()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="an idea" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateIdeaForm
            initialValue={projectId ? { projectId } : undefined}
            onFinish={onClose}
          />
        </PanelModal>
      )}
    />
  )
}
