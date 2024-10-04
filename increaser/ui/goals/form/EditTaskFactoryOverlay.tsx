import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { EditTaskFactoryForm } from '../../taskFactories/form/EditTaskFactoryForm'
import { useUser } from '@increaser/ui/user/state/user'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'
import { PanelModal } from '@lib/ui/modal/PanelModal'

export const EditTaskFactoryOverlay = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()
  const { taskFactories } = useUser()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentTaskFactoryProvider value={taskFactories[activeItemId]}>
      <PanelModal onFinish={() => setActiveItemId(null)}>
        <EditTaskFactoryForm />
      </PanelModal>
    </CurrentTaskFactoryProvider>
  )
}
