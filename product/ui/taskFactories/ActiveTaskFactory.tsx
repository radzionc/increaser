import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useUser } from '@product/ui/user/state/user'

import { CurrentTaskFactoryProvider } from './CurrentTaskFactoryProvider'
import { EditTaskFactoryForm } from './form/EditTaskFactoryForm'

export const ActiveTaskFactory = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()
  const { taskFactories } = useUser()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentTaskFactoryProvider value={taskFactories[activeItemId]}>
      <PanelModal onFinish={() => setActiveItemId(null)}>
        <EditTaskFactoryForm onFinish={() => setActiveItemId(null)} />
      </PanelModal>
    </CurrentTaskFactoryProvider>
  )
}
