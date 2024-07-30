import { AnimatedDuration } from '@lib/ui/time/AnimatedDuration'

import { useFocusedDuration } from './hooks/useFocusedDuration'

export const FocusPassedTime = () => {
  const duration = useFocusedDuration()

  return <AnimatedDuration getDuration={() => duration} />
}
