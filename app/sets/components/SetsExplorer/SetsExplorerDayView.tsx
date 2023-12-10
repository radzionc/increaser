import styled from 'styled-components'
import { SetsExplorerDay, useSetsExplorer } from './SetsExplorerProvider'
import { dayWith, headerHeight, hourHeight } from './config'
import { toSizeUnit } from '@increaser/ui/css/toSizeUnit'
import { VStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { getBlocks } from 'sets/Block'
import { SetsExplorerWorkBlock } from './SetsExplorerWorkBlock'

interface SetsExplorerDayViewProps {
  day: SetsExplorerDay
}

const Container = styled.div`
  min-width: ${toSizeUnit(dayWith)};
  width: ${toSizeUnit(dayWith)};
`

const Content = styled.div`
  position: relative;
`

export const SetsExplorerDayView = ({ day }: SetsExplorerDayViewProps) => {
  const { startHour, endHour } = useSetsExplorer()
  const height = (endHour - startHour) * hourHeight

  const blocks = useMemo(() => getBlocks(day.sets), [day.sets])

  return (
    <Container>
      <VStack alignItems="center" gap={4} style={{ height: headerHeight }}>
        <Text size={14} weight="semibold" color="supporting">
          {format(day.startedAt, 'dd MMM')}
        </Text>
        <Text size={14} color="shy">
          {format(day.startedAt, 'EEEE')}
        </Text>
      </VStack>
      <Content style={{ height }}>
        {blocks.map((block, index) => (
          <SetsExplorerWorkBlock
            key={index}
            block={block}
            dayStartedAt={day.startedAt}
          />
        ))}
      </Content>
    </Container>
  )
}
