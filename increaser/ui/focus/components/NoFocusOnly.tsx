import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useFocusStatus } from '../state/focusIntervals'

export const NoFocusOnly = ({ children }: ComponentWithChildrenProps) => {
  const status = useFocusStatus()

  if (status !== null) {
    return null
  }

  return <>{children}</>
}
