import { useAssertUserState } from '../user/UserStateContext'
import { CurrentTaskProvider } from './CurrentTaskProvider'
import { EditTaskFormOverlay } from './form/EditTaskFormOverlay'
import { useActiveTaskId } from './state/activeTaskId'

export const ActiveTask = () => {
  const [activeItemId, setActiveItemId] = useActiveTaskId()
  const { tasks } = useAssertUserState()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentTaskProvider value={tasks[activeItemId]}>
      <EditTaskFormOverlay onFinish={() => setActiveItemId(null)} />
    </CurrentTaskProvider>
  )
}
