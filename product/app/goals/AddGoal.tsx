import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { CreateGoalForm } from '@product/ui/goals/form/CreateGoalForm'
import { PageHeaderAddButton } from '@product/ui/navigation/components/PageHeaderAddButton'

export const AddGoal = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a goal" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateGoalForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
