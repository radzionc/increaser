import { useUser } from '@increaser/ui/user/state/user'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { CurrentIdeaProvider } from './CurrentIdeaProvider'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { EditIdeaForm } from './form/EditIdeaForm'
import { useEffect } from 'react'

export const ActiveIdea = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()
  const { ideas } = useUser()

  const value = activeItemId ? ideas[activeItemId] : null

  useEffect(() => {
    if (activeItemId && !value) {
      setActiveItemId(null)
    }
  }, [activeItemId, setActiveItemId, value])

  if (!value) {
    return null
  }

  return (
    <CurrentIdeaProvider value={value}>
      <PanelModal onFinish={() => setActiveItemId(null)}>
        <EditIdeaForm onFinish={() => setActiveItemId(null)} />
      </PanelModal>
    </CurrentIdeaProvider>
  )
}
