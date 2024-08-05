import { Block } from '@increaser/entities/Block'
import styled from 'styled-components'
import { getBlockBoundaries } from '@increaser/entities-utils/block'
import { toPercents } from '@lib/utils/toPercents'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { getColor } from '@lib/ui/theme/getters'

import { convertDuration } from '@lib/utils/time/convertDuration'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { transition } from '@lib/ui/css/transition'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { useSetsExplorer } from './SetsExplorerProvider'
import { WorkSession } from '@increaser/ui/sets/manager/overview/blocks/WorkSession'

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
