import { Opener } from '@lib/ui/base/Opener'
import { CreatePrincipleForm } from './form/CreatePrincipleForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'
import { usePrincipleCategoryFilter } from './categoryFilter/state/principleCategoryFilter'

export const AddPrinciple = () => {
  const [categoryId] = usePrincipleCategoryFilter()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a principle" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreatePrincipleForm
            initialValue={categoryId ? { categoryId } : undefined}
            onFinish={onClose}
          />
        </PanelModal>
      )}
    />
  )
}
