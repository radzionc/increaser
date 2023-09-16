import { Block } from '@increaser/entities/Block'
import styled from 'styled-components'
import { useDayOverview } from './DayOverviewProvider'
import {
  getBlockBoundaries,
  getBlockWorkDuration,
} from '@increaser/entities-utils/block'
import { toPercents } from '@increaser/utils/toPercents'
import { takeWholeSpace } from '@increaser/ui/css/takeWholeSpace'
import { getOutlineCSS } from '@increaser/ui/ui/utils/getOutlineCSS'
import { getColor } from '@increaser/ui/ui/theme/getters'
import {
  horizontalPaddingInPx,
  timeLabelWidthInPx,
  timeLabelGapInPx,
} from './config'
import { convertDuration } from '@increaser/utils/time/convertDuration'
import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { WorkSession } from './WorkSession'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'

interface WorkBlockProps {
  block: Block
}

const leftOffset =
  horizontalPaddingInPx + timeLabelWidthInPx + timeLabelGapInPx * 2

const Container = styled.div`
  width: calc(100% - ${leftOffset}px - ${horizontalPaddingInPx}px);
  left: ${leftOffset}px;
  position: absolute;
  ${defaultTransitionCSS};
`

const Content = styled.div`
  position: relative;
  ${takeWholeSpace}
`

const Outline = styled.div`
  ${getOutlineCSS(2, 2)};
  border-radius: 4px;
  border: 1px dashed ${getColor('textSupporting')};
`

const Duration = styled(Text)`
  position: absolute;
  top: 1px;
  right: 4px;
`

export const WorkBlock = ({ block }: WorkBlockProps) => {
  const { timelineStartsAt, timelineEndsAt } = useDayOverview()
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
        {block.sets.map((set) => (
          <WorkSession
            set={set}
            style={{
              top: toPercents((set.start - start) / blockDuration),
              height: toPercents(getSetDuration(set) / blockDuration),
            }}
          />
        ))}
        {showDuration && (
          <Duration color="supporting" size={14} weight="semibold">
            {formatDuration(getBlockWorkDuration(block), 'ms')}
          </Duration>
        )}
      </Content>
    </Container>
  )
}
