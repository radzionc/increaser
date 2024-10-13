import { CreateGoalForm } from '@increaser/ui/goals/form/CreateGoalForm'
import { PageHeaderAddButton } from '@increaser/ui/navigation/components/PageHeaderAddButton'
import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

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
