import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { EditHabitForm } from './form/EditHabitForm'
import { useUser } from '../user/state/user'
import { CurrentHabitProvider } from './CurrentHabitProvider'

export const ActiveHabit = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()

  const { habits } = useUser()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentHabitProvider value={habits[activeItemId]}>
      <PanelModal onFinish={() => setActiveItemId(null)}>
        <EditHabitForm onFinish={() => setActiveItemId(null)} />
      </PanelModal>
    </CurrentHabitProvider>
  )
}
