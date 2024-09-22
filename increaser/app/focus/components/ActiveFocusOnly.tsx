import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useFocusIntervals } from '../hooks/useFocusIntervals'

export const ActiveFocusOnly = ({ children }: ComponentWithChildrenProps) => {
  const [intervals] = useFocusIntervals()

  if (!intervals) {
    return null
  }

  return <>{children}</>
}
