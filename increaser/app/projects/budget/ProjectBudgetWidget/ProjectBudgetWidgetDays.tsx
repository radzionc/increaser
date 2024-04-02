import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import styled, { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { toPercents } from '@lib/utils/toPercents'
import { getShortWeekday } from '@lib/utils/time'
import { sum } from '@lib/utils/array/sum'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'

const Container = styled(HStack)`
  ${takeWholeSpaceAbsolutely};
  left: 0;
  top: 0;
`

const Day = styled(VStack)`
  height: 100%;
  border-right: 1px dashed;
  align-items: end;
  justify-content: end;
  padding-right: 6px;
`

export const ProjectBudgetWidgetDays = () => {
  const weekday = useWeekday()
  const { colors } = useTheme()

  const segments = useProjectDaysAllocation()

  const totalMinutes = sum(segments)

  return (
    <Container>
      {segments.slice(0, -1).map((minutes, index) => {
        if (minutes === 0) return null

        return (
          <Day
            key={index}
            style={{
              width: toPercents(minutes / totalMinutes),
              color: (index === weekday
                ? colors.text
                : colors.textShy
              ).toCssValue(),
            }}
          >
            <Text size={14}>
              {index === weekday && getShortWeekday(weekday)}
            </Text>
          </Day>
        )
      })}
    </Container>
  )
}
