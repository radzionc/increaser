import { Hoverable } from '@lib/ui/base/Hoverable'
import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { EditHabitForm } from '@increaser/app/habits/components/manage/form/EditHabitForm'
import { HabitItemContent } from '@increaser/app/habits/components/manage/HabitItemContent'

export const GoalHabitItem = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Hoverable verticalOffset={0} onClick={onOpen}>
          <HabitItemContent />
        </Hoverable>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <EditHabitForm onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
