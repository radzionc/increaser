import { ChildrenProp } from '@lib/ui/props'

import { useFocusStatus } from '../state/focusIntervals'

export const ActiveFocusOnly = ({ children }: ChildrenProp) => {
  const status = useFocusStatus()

  if (status !== 'active') {
    return null
  }

  return <>{children}</>
}
