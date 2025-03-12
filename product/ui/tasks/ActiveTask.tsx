import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useUser } from '@product/ui/user/state/user'

import { CurrentTaskProvider } from './CurrentTaskProvider'
import { EditTaskFormOverlay } from './form/EditTaskFormOverlay'

export const ActiveTask = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()
  const { tasks } = useUser()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentTaskProvider value={tasks[activeItemId]}>
      <EditTaskFormOverlay onFinish={() => setActiveItemId(null)} />
    </CurrentTaskProvider>
  )
}
