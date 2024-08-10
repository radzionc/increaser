import { borderRadius } from '@lib/ui/css/borderRadius'
import { ComponentWithIndexProps, UIComponentProps } from '@lib/ui/props'
import styled from 'styled-components'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { BarChartItemBreakdownFill } from './BarChartItemBreakdownFill'
import { BarChartItemFill } from './BarChartItemFill'

const Container = styled.div`
  width: calc(100% - 4px);
  ${borderRadius.s};
  overflow: hidden;
`

export const BarChartItem = ({
  index,
  ...rest
}: ComponentWithIndexProps & UIComponentProps) => {
  const { activeProjectId } = useTrackedTimeReport()
  const { projects } = useTrackedTime()

  return (
    <Container {...rest}>
      {activeProjectId ? (
        <BarChartItemFill
          color={projects[activeProjectId].color}
          index={index}
        />
      ) : (
        <BarChartItemBreakdownFill index={index} />
      )}
    </Container>
  )
}
