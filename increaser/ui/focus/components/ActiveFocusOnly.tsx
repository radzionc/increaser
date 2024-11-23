import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useFocusStatus } from '../state/focusIntervals'

export const ActiveFocusOnly = ({ children }: ComponentWithChildrenProps) => {
  const status = useFocusStatus()

  if (status !== 'active') {
    return null
  }

  return <>{children}</>
}
