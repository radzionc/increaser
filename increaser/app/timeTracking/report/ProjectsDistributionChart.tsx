import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import styled, { useTheme } from 'styled-components'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { sum } from '@lib/utils/array/sum'
import { VStack } from '@lib/ui/layout/Stack'
import { order } from '@lib/utils/array/order'
import { MinimalisticPieChart } from '@lib/ui/charts/PieChart/MinimalisticPieChart'

const Container = styled(VStack)`
  min-width: 200px;
  max-width: 200px;
`

export const ProjectsDistributionChart = () => {
  const { projectsData, activeProjectId } = useTrackedTimeReport()
  const { colors } = useTheme()
  const { projectsRecord } = useProjects()

  const items = order(
    Object.entries(projectsData),
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
            color: shouldShow
              ? colors.getLabelColor(projectsRecord[id].color)
              : colors.mist,
            labelColor: shouldShow ? colors.contrast : colors.transparent,
          }
        })}
      />
    </Container>
  )
}
