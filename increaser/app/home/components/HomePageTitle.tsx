import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { formatTime } from '@lib/utils/time/formatTime'
import { Text } from '@lib/ui/text'
import { WEEKDAYS } from '@lib/utils/time'
import { PageTitle } from '@increaser/app/ui/PageTitle'
import { RhytmicRerender } from '@lib/ui/base/RhytmicRerender'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useTodaySets } from '../../sets/hooks/useTodaySets'
import { FocusTitle } from './FocusTitle'

export const HomePageTitle = () => {
  const weekday = useWeekday()

  const { currentSet } = useFocus()
  const todaySets = useTodaySets()

  if (currentSet) {
    return <FocusTitle />
  }

  if (!todaySets.length) {
    return (
      <PageTitle
        title={
          <Text>
            {WEEKDAYS[weekday]},
            <RhytmicRerender render={() => formatTime(Date.now())} />
          </Text>
        }
      />
    )
  }

  return null
}
