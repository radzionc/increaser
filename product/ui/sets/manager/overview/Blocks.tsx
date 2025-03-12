import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { getIntervalDuration } from '@lib/utils/interval/getIntervalDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { toPercents } from '@lib/utils/toPercents'
import {
  getBlockBoundaries,
  getBlocks,
  getBlockWorkDuration,
} from '@product/entities-utils/block'
import styled from 'styled-components'

import { dayOverviewConfig } from './config'
import { useDayOverview } from './DayOverviewProvider'

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
