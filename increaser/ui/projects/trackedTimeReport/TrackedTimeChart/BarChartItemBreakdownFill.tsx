import { ComponentWithIndexProps } from '@lib/ui/props'
import styled from 'styled-components'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { useDataPointBreakdown } from '../hooks/useDataPointBreakdown'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { useBarChartFillColor } from './hooks/useBarChartFillColor'

const Container = styled.div`
  ${takeWholeSpace};
  gap: 1px;
  display: grid;
`

export const BarChartItemBreakdownFill = ({
  index,
}: ComponentWithIndexProps) => {
  const items = useDataPointBreakdown(index)
  const { projects } = useTrackedTime()
  const getColor = useBarChartFillColor(index)

  return (
    <Container
      style={{
        gridTemplateRows: items.map(({ value }) => `${value}fr`).join(' '),
      }}
    >
      {items.map(({ key }) => {
        const background = getColor(projects[key].color).toCssValue()

        return <div key={key} style={{ background }} />
      })}
    </Container>
  )
}
