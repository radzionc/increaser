import { Hoverable } from '@lib/ui/base/Hoverable'
import { Opener } from '@lib/ui/base/Opener'
import { PanelModal } from '@lib/ui/modal/PanelModal'

import { HabitItemContent } from '../../habits/components/manage/HabitItemContent'
import { EditHabitForm } from '../../habits/form/EditHabitForm'

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
