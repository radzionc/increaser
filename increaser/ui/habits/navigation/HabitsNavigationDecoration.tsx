import { useUser } from '../../user/state/user'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'

import { HabitsNavigationPrompt } from './HabitsNavigationPrompt'

export const HabitsNavigationDecoration = () => {
  const todayStartedAt = useStartOfDay()
  const { viewedHabitsAt } = useUser()

  if (viewedHabitsAt && viewedHabitsAt >= todayStartedAt) return null

  return <HabitsNavigationPrompt />
}
