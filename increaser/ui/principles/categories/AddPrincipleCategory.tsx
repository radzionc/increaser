import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PageHeaderAddButton } from '../../navigation/components/PageHeaderAddButton'
import { CreatePrincipleCategoryForm } from './form/CreatePrincipleCategoryForm'

export const AddPrincipleCategory = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a category" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreatePrincipleCategoryForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
