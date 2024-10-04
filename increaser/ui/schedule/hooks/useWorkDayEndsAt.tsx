import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useUser } from '@increaser/ui/user/state/user'
import { convertDuration } from '@lib/utils/time/convertDuration'

export const useWorkDayEndsAt = () => {
  const { finishWorkAt } = useUser()

  const todayStartedAt = useStartOfDay()

  return todayStartedAt + convertDuration(finishWorkAt, 'min', 'ms')
}
