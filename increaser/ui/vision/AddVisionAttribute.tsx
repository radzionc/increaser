import { Opener } from '@lib/ui/base/Opener'
import { CreateVisionAttributeForm } from './form/CreateVisionAttributeForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'

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
