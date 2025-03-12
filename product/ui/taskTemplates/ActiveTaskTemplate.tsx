import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useUser } from '@product/ui/user/state/user'

import { CurrentTaskTemplateProvider } from './CurrentTaskTemplateProvider'
import { EditTaskTemplateForm } from './form/EditTaskTemplateForm'

export const ActiveTaskTemplate = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()
  const { taskTemplates } = useUser()

  if (!activeItemId) {
    return null
  }

  return (
    <CurrentTaskTemplateProvider value={taskTemplates[activeItemId]}>
      <PanelModal onFinish={() => setActiveItemId(null)}>
        <EditTaskTemplateForm onFinish={() => setActiveItemId(null)} />
      </PanelModal>
    </CurrentTaskTemplateProvider>
  )
}
