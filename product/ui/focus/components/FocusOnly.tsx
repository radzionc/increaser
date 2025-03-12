import { ChildrenProp } from '@lib/ui/props'

import { useFocusStatus } from '../state/focusIntervals'

export const FocusOnly = ({ children }: ChildrenProp) => {
  const status = useFocusStatus()

  if (status === null) {
    return null
  }

  return <>{children}</>
}
