import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { useFocus } from 'focus/hooks/useFocus'
import { useDayOverview } from './DayOverviewProvider'
import { CreateSet } from '../CreateSet'

export const AddSession = () => {
  const { currentSet } = useFocus()
  const todayStartedAt = useStartOfDay()
  const { dayStartedAt } = useDayOverview()

  if (currentSet || dayStartedAt !== todayStartedAt) {
    return null
  }

  return <CreateSet />
}
