import { Block } from '@increaser/entities/Block'
import styled from 'styled-components'
import { getBlockBoundaries } from '@increaser/entities-utils/block'
import { toPercents } from '@increaser/utils/toPercents'
import { takeWholeSpace } from '@increaser/ui/css/takeWholeSpace'
import { getColor } from '@increaser/ui/theme/getters'

import { convertDuration } from '@increaser/utils/time/convertDuration'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { transition } from '@increaser/ui/css/transition'
import { absoluteOutline } from '@increaser/ui/css/absoluteOutline'
import { useSetsExplorer } from './SetsExplorerProvider'
import { WorkSession } from '../DayOverview/WorkBlocks/WorkSession'

interface SetsExplorerWorkBlockProps {
  block: Block
  dayStartedAt: number
}

const Container = styled.div`
  width: 100%;
  position: absolute;
  ${transition};
`

const Content = styled.div`
  position: relative;
  ${takeWholeSpace}
`

const Outline = styled.div`
  ${absoluteOutline(2, 2)};
  border-radius: 4px;
  border: 1px solid ${getColor('textShy')};
`

export const SetsExplorerWorkBlock = ({
  block,
  dayStartedAt,
}: SetsExplorerWorkBlockProps) => {
  const { startHour, endHour } = useSetsExplorer()
  const timelineStartsAt = dayStartedAt + convertDuration(startHour, 'h', 'ms')
  const timespan = convertDuration(endHour - startHour, 'h', 'ms')
  const { start, end } = getBlockBoundaries(block)
  const blockDuration = end - start

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
            showIdentifier={false}
            style={{
              top: toPercents((set.start - start) / blockDuration),
              height: toPercents(getSetDuration(set) / blockDuration),
            }}
          />
        ))}
      </Content>
    </Container>
  )
}
