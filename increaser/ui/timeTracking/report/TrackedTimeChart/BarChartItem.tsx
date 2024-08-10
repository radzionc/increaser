import { borderRadius } from '@lib/ui/css/borderRadius'
import { useActiveItemIndex } from '@lib/ui/list/ActiveItemIndexProvider'
import { ComponentWithIndexProps, UIComponentProps } from '@lib/ui/props'
import styled, { useTheme } from 'styled-components'
import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { useTrackedTime } from '../state/TrackedTimeContext'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'

const Container = styled.div`
  width: calc(100% - 4px);
  ${borderRadius.s};
  overflow: hidden;
`

export const BarChartItem = ({
  index,
  ...rest
}: ComponentWithIndexProps & UIComponentProps) => {
  const [activeIndex] = useActiveItemIndex()
  const { activeProjectId } = useTrackedTimeReport()
  const { projects } = useTrackedTime()

  const { colors } = useTheme()
  const color = activeProjectId
    ? projects[activeProjectId].color
    : colors.primary

  const background = (
    index !== null
      ? index === activeIndex
        ? color
        : colors.foregroundExtra
      : color
  ).toCssValue()

  return (
    <Container {...rest}>
      <TakeWholeSpace style={{ background }} />
    </Container>
  )
}
