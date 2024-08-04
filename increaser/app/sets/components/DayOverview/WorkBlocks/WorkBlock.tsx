import { Block } from '@increaser/entities/Block'
import styled from 'styled-components'
import { useDayOverview } from '../DayOverviewProvider'
import {
  getBlockBoundaries,
  getBlockWorkDuration,
} from '@increaser/entities-utils/block'
import { toPercents } from '@lib/utils/toPercents'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { getColor } from '@lib/ui/theme/getters'
import { horizontalPaddingInPx, timeLabelGapInPx } from '../config'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { WorkSession } from './WorkSession'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { dayTimeLabelsWidthInPx } from '@increaser/app/sets/components/DayTimeLabels'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { useStartOfWeekday } from '@lib/ui/time/hooks/useStartOfWeekday'

interface WorkBlockProps {
  block: Block
}

const leftOffset =
  horizontalPaddingInPx + dayTimeLabelsWidthInPx + timeLabelGapInPx * 3

const Container = styled.div`
  width: calc(100% - ${leftOffset}px - ${horizontalPaddingInPx}px);
  left: ${leftOffset}px;
  position: absolute;
`

const Content = styled.div`
  position: relative;
  ${takeWholeSpace}
  color: ${getColor('contrast')};
  font-weight: 500;
`

const Outline = styled.div`
  ${absoluteOutline(2, 0)};
  border-right: 1px dashed;
`

const Duration = styled(Text)`
  position: absolute;
  top: 1px;
  right: 4px;
`

export const WorkBlock = ({ block }: WorkBlockProps) => {
  const [weekday] = useSelectedWeekday()
  const dayStartedAt = useStartOfWeekday(weekday)
  const { startHour, endHour } = useDayOverview()
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')
  const timelineEndsAt = dayStartedAt + convertDuration(endHour, 'h', 'ms')
  const timespan = timelineEndsAt - timelineStartsAt
  const { start, end } = getBlockBoundaries(block)
  const blockDuration = end - start
  const showDuration = blockDuration > convertDuration(25, 'min', 'ms')

  return (
    <Container
      style={{
        top: toPercents((start - timelineStartsAt) / timespan),
        height: toPercents(blockDuration / timespan),
      }}
    >
      <Content>
        <Outline />
        {block.sets.map((set, index) => (
          <WorkSession
            key={index}
            set={set}
            style={{
              top: toPercents((set.start - start) / blockDuration),
              height: toPercents(getSetDuration(set) / blockDuration),
            }}
          />
        ))}
        {showDuration && (
          <Duration size={12}>
            {formatDuration(getBlockWorkDuration(block), 'ms')}
          </Duration>
        )}
      </Content>
    </Container>
  )
}
