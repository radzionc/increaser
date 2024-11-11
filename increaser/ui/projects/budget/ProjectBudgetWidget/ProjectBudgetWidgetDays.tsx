import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled, { css } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { toPercents } from '@lib/utils/toPercents'
import { getShortWeekday } from '@lib/utils/time'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'
import { getColor } from '@lib/ui/theme/getters'
import { ComponentWithActiveState } from '@lib/ui/props'

const DayName = styled(Text)`
  font-size: 12px;
  font-weight: 500;
`

const Day = styled(VStack)<ComponentWithActiveState>`
  height: 100%;
  border-right: 1px dashed ${getColor('textShy')};
  color: ${getColor('textShy')};
  align-items: center;
  justify-content: center;
  padding-right: 4px;
  pointer-events: none;

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${getColor('contrast')};
    `}

  &:last-child {
    border-right: 0;
  }

  opacity: 0;
`

const Container = styled(HStack)`
  ${takeWholeSpaceAbsolutely};

  &:hover ${Day} {
    opacity: 1;
  }
`

export const ProjectBudgetWidgetDays = () => {
  const currentWeekday = useWeekday()

  const segments = useProjectDaysAllocation()

  return (
    <Container>
      {segments.map(({ value, weekday }) => {
        if (value === 0) return null

        const isActive = currentWeekday === weekday

        return (
          <Day
            key={weekday}
            isActive={isActive}
            style={{
              width: toPercents(value),
            }}
          >
            <DayName>{getShortWeekday(weekday)}</DayName>
          </Day>
        )
      })}
    </Container>
  )
}
