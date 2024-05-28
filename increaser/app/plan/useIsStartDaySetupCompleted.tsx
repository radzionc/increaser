import { useStartDayCompletion } from './useStartDayCompletion'

export const useIsStartDaySetupCompleted = () => {
  const completion = useStartDayCompletion()

  return Object.values(completion).every(Boolean)
}
