import { useUser } from '@increaser/ui/user/state/user'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { EditTaskFormOverlay } from './form/EditTaskFormOverlay'
import { useActiveTaskId } from './state/activeTaskId'

export const ActiveTask = () => {
  const [activeItemId, setActiveItemId] = useActiveTaskId()
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
