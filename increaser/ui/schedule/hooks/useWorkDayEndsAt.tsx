import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useAssertUserState } from '../../user/UserStateContext'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useWorkDayEndsAt = () => {
  const { finishWorkAt } = useAssertUserState()

  const todayStartedAt = useStartOfDay()

  return todayStartedAt + convertDuration(finishWorkAt, 'min', 'ms')
}
