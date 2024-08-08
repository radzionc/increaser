import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import styled, { useTheme } from 'styled-components'
import { sum } from '@lib/utils/array/sum'
import { VStack } from '@lib/ui/layout/Stack'
import { MinimalisticPieChart } from '@lib/ui/charts/PieChart/MinimalisticPieChart'
import { useTrackedTime } from './state/TrackedTimeContext'
import { useOrderedTimeSeries } from './hooks/useOrderedTimeSeries'
import { sameDimensions } from '@lib/ui/css/sameDimensions'

const Container = styled(VStack)`
  ${sameDimensions(200)}
`

export const ProjectsDistributionChart = () => {
  const { activeProjectId } = useTrackedTimeReport()
  const { colors } = useTheme()
  const { projects } = useTrackedTime()

  const items = useOrderedTimeSeries()

  return (
    <Container>
      <MinimalisticPieChart
        value={items.map(({ id, data }) => {
          const seconds = sum(data)
          const shouldShow = !activeProjectId || activeProjectId === id
          return {
            value: seconds,
            color: shouldShow ? projects[id].color : colors.mist,
            labelColor: shouldShow ? colors.contrast : colors.transparent,
          }
        })}
      />
    </Container>
  )
}
