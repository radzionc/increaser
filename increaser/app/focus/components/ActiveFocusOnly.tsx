import { useFocus } from '@increaser/ui/focus/FocusContext'
import { ComponentWithChildrenProps } from '@lib/ui/props'

export const ActiveFocusOnly = ({ children }: ComponentWithChildrenProps) => {
  const { intervals } = useFocus()

  if (!intervals) {
    return null
  }

  return <>{children}</>
}
