import { AnimatedDuration } from '@lib/ui/time/AnimatedDuration'

import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'

export const FocusPassedTime = () => {
  const { startedAt } = useCurrentFocus()

  return <AnimatedDuration getDuration={(now) => now - startedAt} />
}
