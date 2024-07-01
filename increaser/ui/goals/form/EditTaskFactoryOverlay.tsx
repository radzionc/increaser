import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

export const EditTaskFactoryOverlay = () => {
  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (!activeItemId) {
    return null
  }
}
