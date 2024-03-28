import { useTrackedTimeReport } from './state/TrackedTimeReportContext'
import styled, { useTheme } from 'styled-components'
import { sum } from '@lib/utils/array/sum'
import { VStack } from '@lib/ui/layout/Stack'
import { order } from '@lib/utils/array/order'
import { MinimalisticPieChart } from '@lib/ui/charts/PieChart/MinimalisticPieChart'
import { useTrackedTime } from './state/TrackedTimeContext'

const Container = styled(VStack)`
  min-width: 200px;
  max-width: 200px;
`

export const ProjectsDistributionChart = () => {
  const { projectsTimeSeries, activeProjectId } = useTrackedTimeReport()
  const { colors } = useTheme()
  const { projects } = useTrackedTime()

  const items = order(
    Object.entries(projectsTimeSeries),
    ([, data]) => sum(data),
    'desc',
  ).filter(([, data]) => sum(data) > 0)

  return (
    <Container>
      <MinimalisticPieChart
        value={items.map(([id, data]) => {
          const seconds = sum(data)
          const shouldShow = !activeProjectId || activeProjectId === id
          return {
            value: seconds,
            color: shouldShow ? projects[id].hslaColor : colors.mist,
            labelColor: shouldShow ? colors.contrast : colors.transparent,
          }
        })}
      />
    </Container>
  )
}
