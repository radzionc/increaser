import { isToday } from 'date-fns'

import { useUnlockedLateWorkAt } from './unlockedLateWorkAt'

export const useIsTodayLateWorkUnlocked = () => {
  const [unlockedLateWorkAt] = useUnlockedLateWorkAt()

  return unlockedLateWorkAt && isToday(unlockedLateWorkAt)
}
