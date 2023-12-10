import styled from 'styled-components'
import { useSetsExplorer } from './SetsExplorerProvider'
import { SetsExplorerDayView } from './SetsExplorerDayView'
import { useEffect, useRef } from 'react'
import { horizontalPadding } from '@increaser/ui/css/horizontalPadding'
import { toSizeUnit } from '@increaser/ui/css/toSizeUnit'
import { daysGap } from './config'
import { VStack } from '@increaser/ui/layout/Stack'
import { SetsExplorerDaysChart } from './SetsExplorerDaysChart'

const Wrapper = styled(VStack)`
  ${horizontalPadding(4)};
  gap: ${toSizeUnit(daysGap)};
  overflow-x: auto;
  flex: 1;
  &::-webkit-scrollbar {
    height: 8px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${toSizeUnit(daysGap)};
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
  }, [])

  return (
    <Wrapper ref={container}>
      <Container>
        {days.map((day) => (
          <SetsExplorerDayView key={day.startedAt} day={day} />
        ))}
      </Container>
      <SetsExplorerDaysChart />
    </Wrapper>
  )
}
