import { Opener } from '@lib/ui/base/Opener'
import { CreatePrincipleForm } from './form/CreatePrincipleForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'

export const AddPrinciple = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a principle" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreatePrincipleForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
