import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useFocusStatus } from '../state/focusIntervals'

export const PausedFocusOnly = ({ children }: ComponentWithChildrenProps) => {
  const status = useFocusStatus()

  if (status !== 'paused') {
    return null
  }

  return <>{children}</>
}
