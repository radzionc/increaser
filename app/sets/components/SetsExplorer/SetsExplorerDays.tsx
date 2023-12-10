import styled from 'styled-components'
import { useSetsExplorer } from './SetsExplorerProvider'
import { SetsExplorerDayView } from './SetsExplorerDayView'
import { useEffect, useRef } from 'react'
import { horizontalPadding } from '@increaser/ui/css/horizontalPadding'

const Container = styled.div`
  ${horizontalPadding(4)};
  display: flex;
  flex-direction: row;
  gap: 8px;
  overflow-x: auto;
  flex: 1;
  &::-webkit-scrollbar {
    height: 8px;
  }
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
    <Container ref={container}>
      {days.map((day) => (
        <SetsExplorerDayView key={day.startedAt} day={day} />
      ))}
    </Container>
  )
}
