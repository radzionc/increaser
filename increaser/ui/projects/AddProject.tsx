import { Opener } from '@lib/ui/base/Opener'
import { CreateProjectForm } from './form/CreateProjectForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'

export const AddProject = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a project" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateProjectForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
