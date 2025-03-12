import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'

import { CreateProjectForm } from './form/CreateProjectForm'

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
