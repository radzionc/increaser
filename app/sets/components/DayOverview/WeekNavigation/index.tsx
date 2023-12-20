import { WEEKDAYS } from '@increaser/utils/time'
import styled from 'styled-components'

import { useDayOverview } from '../DayOverviewProvider'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { useStartOfWeek } from '@increaser/ui/hooks/useStartOfWeek'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { useFocus } from 'focus/hooks/useFocus'
import { verticalPadding } from '@increaser/ui/css/verticalPadding'
import { horizontalPadding } from '@increaser/ui/css/horizontalPadding'
import { UniformColumnGrid } from '@increaser/ui/Layout/UniformColumnGrid'
import { horizontalPaddingInPx } from '../config'
import { WeekdayOption } from './WeekdayOption'
import { InvisibleHTMLRadio } from '@increaser/ui/inputs/InvisibleHTMLRadio'

const Container = styled(UniformColumnGrid)`
  ${verticalPadding(2)}
  ${horizontalPadding(horizontalPaddingInPx * 0.6)}
`

export const WeekNavigation = () => {
  const todayStartedAt = useStartOfDay()
  const weekStartedAt = useStartOfWeek()
  const { setCurrentDay, dayStartedAt } = useDayOverview()
  const { currentSet } = useFocus()

  if (currentSet) {
    return null
  }

  return (
    <Container rowHeight={horizontalPaddingInPx * 1.6} gap={1} fullWidth>
      {WEEKDAYS.map((weekday, index) => {
        const weekdayStartsAt =
          weekStartedAt + convertDuration(index, 'd', 'ms')
        const isActive = dayStartedAt === weekdayStartsAt
        const isEnabled = weekdayStartsAt <= todayStartedAt
        return (
          <WeekdayOption key={index} isActive={isActive} isEnabled={isEnabled}>
            {isEnabled && (
              <InvisibleHTMLRadio
                isSelected={isActive}
                groupName="week-navigation"
                value={weekdayStartsAt}
                onSelect={() => setCurrentDay(weekdayStartsAt)}
              />
            )}
            {weekday.slice(0, 3)}
          </WeekdayOption>
        )
      })}
    </Container>
  )
}
