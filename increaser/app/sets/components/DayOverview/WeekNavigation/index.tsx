import { WEEKDAYS } from '@lib/utils/time'
import styled from 'styled-components'

import { useDayOverview } from '../DayOverviewProvider'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { horizontalPaddingInPx } from '../config'
import { WeekdayOption } from './WeekdayOption'
import { InvisibleHTMLRadio } from '@lib/ui/inputs/InvisibleHTMLRadio'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(UniformColumnGrid)`
  ${verticalPadding(0)};
  border-bottom: 2px solid ${getColor('mist')};
`

export const WeekNavigation = () => {
  const todayStartedAt = useStartOfDay()
  const weekStartedAt = useStartOfWeek()
  const { setCurrentDay, dayStartedAt } = useDayOverview()

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
