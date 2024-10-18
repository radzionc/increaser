import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { PageHeaderAddButton } from '../navigation/components/PageHeaderAddButton'
import { CreateHabitForm } from '@increaser/app/habits/components/manage/form/CreateHabitForm'

export const AddHabit = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <PageHeaderAddButton value="a habit" onClick={onOpen} />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateHabitForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
