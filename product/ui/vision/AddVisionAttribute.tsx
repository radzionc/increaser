import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'

import { CreateVisionAttributeForm } from './form/CreateVisionAttributeForm'

export const AddVisionAttribute = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="an aspiration" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateVisionAttributeForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
