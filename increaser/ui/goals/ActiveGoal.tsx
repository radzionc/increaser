import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { EditGoalForm } from './form/EditGoalForm'
import { useUser } from '../user/state/user'
import { CurrentGoalProvider } from './CurrentGoalProvider'

export const ActiveGoal = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()

  const { goals } = useUser()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentGoalProvider value={goals[activeItemId]}>
      <PanelModal onFinish={() => setActiveItemId(null)}>
        <EditGoalForm onClose={() => setActiveItemId(null)} />
      </PanelModal>
    </CurrentGoalProvider>
  )
}
