import { ChildrenProp } from '@lib/ui/props'
import { useFocusStatus } from '../state/focusIntervals'

export const PausedFocusOnly = ({ children }: ChildrenProp) => {
  const status = useFocusStatus()

  if (status !== 'paused') {
    return null
  }

  return <>{children}</>
}
