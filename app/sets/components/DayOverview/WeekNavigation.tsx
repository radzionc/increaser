import { WEEKDAYS } from '@increaser/utils/time'
import styled, { css } from 'styled-components'

import { centerContent } from '@increaser/ui/css/centerContent'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { useDayOverview } from './DayOverviewProvider'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { useStartOfWeek } from '@increaser/ui/hooks/useStartOfWeek'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { useFocus } from 'focus/hooks/useFocus'
import { interactive } from '@increaser/ui/css/interactive'
import { verticalPadding } from '@increaser/ui/css/verticalPadding'
import { horizontalPadding } from '@increaser/ui/css/horizontalPadding'
import { SameWidthChildrenRow } from '@increaser/ui/ui/Layout/SameWidthChildrenRow'
import { horizontalPaddingInPx } from './config'

const Option = styled.div<{ isActive: boolean; isEnabled: boolean }>`
  height: 100%;
  flex: 1;
  ${centerContent}
  ${defaultTransitionCSS};
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  border: 2px solid transparent;

  ${({ isEnabled }) =>
    isEnabled
      ? css`
          ${interactive}
          color: ${getColor('textSupporting')};
        `
      : css`
          pointer-events: none;
          color: ${getColor('textShy')};
        `}

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
        `
      : css`
          :hover {
            color: ${getColor('text')};
            background: ${getColor('mist')};
          }
        `}
`

const Container = styled(SameWidthChildrenRow)`
  ${verticalPadding(0)}
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
    <Container rowHeight={horizontalPaddingInPx * 2} gap={1} fullWidth>
      {WEEKDAYS.map((weekday, index) => {
        const weekdayStartedAt =
          weekStartedAt + convertDuration(index, 'd', 'ms')
        const isActive = dayStartedAt === weekdayStartedAt
        const isEnabled = weekdayStartedAt <= todayStartedAt
        return (
          <Option
            onClick={() => setCurrentDay(weekdayStartedAt)}
            key={index}
            isActive={isActive}
            isEnabled={isEnabled}
          >
            {weekday.slice(0, 3)}
          </Option>
        )
      })}
    </Container>
  )
}
