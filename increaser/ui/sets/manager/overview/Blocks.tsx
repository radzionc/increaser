import {
  getBlockBoundaries,
  getBlocks,
  getBlockWorkDuration,
} from '@increaser/entities-utils/block'
import { useDayOverview } from './DayOverviewProvider'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { convertDuration } from '@lib/utils/time/convertDuration'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { toPercents } from '@lib/utils/toPercents'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { dayOverviewConfig } from './config'

const Container = styled.div`
  position: absolute;
  right: 0px;

  right: ${toSizeUnit(dayOverviewConfig.horizontalPadding)};

  color: ${getColor('text')};
  border-right: 1px dashed;
  padding-right: 6px;
  font-weight: 500;
  pointer-events: none;
`

export const Blocks = () => {
  const { sets, startHour, endHour } = useDayOverview()
  const [weekday] = useSelectedWeekday()
  const dayStartedAt = useStartOfWeekday(weekday)
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const timespan = timelineEndsAt - timelineStartsAt
  const blocks = getBlocks(sets)

  return (
    <>
      {blocks.map((block, index) => {
        const { start, end } = getBlockBoundaries(block)
        const duration = getIntervalDuration({ start, end })

        const workDuration = getBlockWorkDuration(block)
        const isSignificant = workDuration > convertDuration(25, 'min', 'ms')

        if (!isSignificant) return null

        return (
          <Container
            key={index}
            style={{
              top: toPercents((start - timelineStartsAt) / timespan),
              height: toPercents(duration / timespan),
            }}
          >
            <Text size={12}>
              {formatDuration(getBlockWorkDuration(block), 'ms')}
            </Text>
          </Container>
        )
      })}
    </>
  )
}
