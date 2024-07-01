import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskFormOverlay } from '../../tasks/form/TaskFormOverlay'
import { EditTaskFactoryForm } from '../../taskFactories/form/EditTaskFactoryForm'

export const EditTaskFactoryOverlay = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (!activeItemId) {
    return null
  }

  return (
    <TaskFormOverlay onFinish={() => setActiveItemId(null)}>
      <EditTaskFactoryForm />
    </TaskFormOverlay>
  )
}
