import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useUser } from '@product/ui/user/state/user'

export const useWorkDayEndsAt = () => {
  const { finishWorkAt } = useUser()

  const todayStartedAt = useStartOfDay()

  return todayStartedAt + convertDuration(finishWorkAt, 'min', 'ms')
}
