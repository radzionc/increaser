import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'
import { useProjectFilter } from '../projects/filter/project/state/projectFilter'

import { CreateIdeaForm } from './form/CreateIdeaForm'

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
