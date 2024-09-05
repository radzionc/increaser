import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled, { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { toPercents } from '@lib/utils/toPercents'
import { getShortWeekday } from '@lib/utils/time'
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
  &:hover ${Day} {
    opacity: 1;
  }
`

export const ProjectBudgetWidgetDays = () => {
  const weekday = useWeekday()
  const { colors } = useTheme()

  const segments = useProjectDaysAllocation()

  return (
    <Container>
      {segments.map((value, index) => {
        if (value === 0) return null

        return (
          <Day
            key={index}
            style={{
              width: toPercents(value / 1),
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
