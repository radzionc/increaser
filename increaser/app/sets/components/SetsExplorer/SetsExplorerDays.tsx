import styled from 'styled-components'
import { useSetsExplorer } from './SetsExplorerProvider'
import { SetsExplorerDayView } from './SetsExplorerDayView'
import { useEffect, useRef } from 'react'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { VStack } from '@lib/ui/layout/Stack'
import { setsExplorerConfig } from './config'

const Wrapper = styled(VStack)`
  ${horizontalPadding(4)};
  gap: ${toSizeUnit(setsExplorerConfig.daysGap)};
  overflow-x: auto;
  flex: 1;
  &::-webkit-scrollbar {
    height: 8px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${toSizeUnit(setsExplorerConfig.daysGap)};
`

export const SetsExplorerDays = () => {
  const { days } = useSetsExplorer()
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = container.current
    if (element) {
      const scrollWidth = element.scrollWidth
      element.scrollLeft = scrollWidth
    }
  }, [days.length])

  return (
    <Wrapper ref={container}>
      <Container>
        {days.map((day) => (
          <SetsExplorerDayView key={day.startedAt} day={day} />
        ))}
      </Container>
    </Wrapper>
  )
}
