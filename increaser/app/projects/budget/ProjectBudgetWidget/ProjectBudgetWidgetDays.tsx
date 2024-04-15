import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled, { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { toPercents } from '@lib/utils/toPercents'
import { getShortWeekday } from '@lib/utils/time'
import { sum } from '@lib/utils/array/sum'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'
import { transition } from '@lib/ui/css/transition'

const DayName = styled(Text)`
  font-size: 12px;
  font-weight: 500;
`

const Day = styled(VStack)`
  height: 100%;
  border-right: 1px dashed;
  align-items: center;
  justify-content: center;
  padding-right: 4px;
  opacity: 0;
  ${transition};
`

const Container = styled(HStack)`
  ${takeWholeSpaceAbsolutely};
  left: 0;
  top: 0;
  &:hover ${Day} {
    opacity: 1;
  }
`

export const ProjectBudgetWidgetDays = () => {
  const weekday = useWeekday()
  const { colors } = useTheme()

  const segments = useProjectDaysAllocation()

  const totalMinutes = sum(segments)

  return (
    <Container>
      {segments.map((minutes, index) => {
        if (minutes === 0) return null

        return (
          <Day
            key={index}
            style={{
              width: toPercents(minutes / totalMinutes),
              color: (index === weekday
                ? colors.contrast
                : colors.textSupporting
              ).toCssValue(),
              borderWidth: index === segments.length - 1 ? 0 : 1,
            }}
          >
            <DayName>{getShortWeekday(index)}</DayName>
          </Day>
        )
      })}
    </Container>
  )
}
