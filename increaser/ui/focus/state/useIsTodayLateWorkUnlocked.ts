import { useUnlockedLateWorkAt } from './unlockedLateWorkAt'
import { isToday } from 'date-fns'

export const useIsTodayLateWorkUnlocked = () => {
  const [unlockedLateWorkAt] = useUnlockedLateWorkAt()

  return unlockedLateWorkAt && isToday(unlockedLateWorkAt)
}
