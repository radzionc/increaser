import { usePlanDayCompletion } from './usePlanDayCompletion'

export const useIsTodayPlanned = () => {
  const completion = usePlanDayCompletion()

  return Object.values(completion).every(Boolean)
}
