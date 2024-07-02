import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskFormOverlay } from '../../tasks/form/TaskFormOverlay'
import { EditTaskFactoryForm } from '../../taskFactories/form/EditTaskFactoryForm'
import { useAssertUserState } from '../../user/UserStateContext'
import { CurrentTaskFactoryProvider } from '../../taskFactories/CurrentTaskFactoryProvider'

export const EditTaskFactoryOverlay = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()
  const { taskFactories } = useAssertUserState()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentTaskFactoryProvider value={taskFactories[activeItemId]}>
      <TaskFormOverlay onFinish={() => setActiveItemId(null)}>
        <EditTaskFactoryForm />
      </TaskFormOverlay>
    </CurrentTaskFactoryProvider>
  )
}
