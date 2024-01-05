import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useDayOverview } from './DayOverviewProvider'
import { CreateSet } from '../CreateSet'
import { useFocus } from '@increaser/ui/focus/FocusContext'

export const AddSession = () => {
  const { currentSet } = useFocus()
  const todayStartedAt = useStartOfDay()
  const { dayStartedAt } = useDayOverview()

  if (currentSet || dayStartedAt !== todayStartedAt) {
    return null
  }

  return <CreateSet />
}
