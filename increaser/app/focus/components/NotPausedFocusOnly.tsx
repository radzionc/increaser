import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'
import { ComponentWithChildrenProps } from '@lib/ui/props'

export const NotPausedFocusOnly = ({
  children,
}: ComponentWithChildrenProps) => {
  const isPaused = useIsFocusPaused()

  if (isPaused) {
    return null
  }

  return <>{children}</>
}
