import { useUser } from '@increaser/ui/user/state/user'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { EditTaskFormOverlay } from './form/EditTaskFormOverlay'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

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
