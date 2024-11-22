import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { HStack, VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { toPercents } from '@lib/utils/toPercents'
import { getShortWeekday } from '@lib/utils/time'
import { useProjectDaysAllocation } from '../hooks/useProjectDaysAllocation'
import { getColor } from '@lib/ui/theme/getters'
import { useCurrentProject } from '../../CurrentProjectProvider'
import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'

const DayName = styled(Text)`
  font-size: 12px;
  font-weight: 500;
`

const Day = styled(VStack)`
  height: 100%;
  border-right: 1px solid ${getColor('mistExtra')};
  color: ${getColor('textShy')};
  align-items: center;
  justify-content: center;
  padding-right: 4px;
  pointer-events: none;

  &:last-child {
    border-right: 0;
  }
`

const Container = styled(HStack)`
  ${takeWholeSpaceAbsolutely};

  &:hover ${Day} {
    opacity: 1;
  }
`

export const ProjectBudgetWidgetDays = () => {
  const segments = useProjectDaysAllocation()

  const { allocatedMinutesPerWeek, id } = useCurrentProject()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  const width = toPercents(
    doneMinutesThisWeek > allocatedMinutesPerWeek
      ? allocatedMinutesPerWeek / doneMinutesThisWeek
      : 1,
  )

  return (
    <Container style={{ width }}>
      {segments.map(({ value, weekday }) => {
        if (value === 0) return null

        return (
          <Day
            key={weekday}
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
