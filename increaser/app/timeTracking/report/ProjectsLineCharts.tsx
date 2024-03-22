import { useMemo } from 'react'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { sum } from '@lib/utils/array/sum'
import { order } from '@lib/utils/array/order'
import { HSLA } from '@lib/ui/colors/HSLA'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import styled from 'styled-components'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { lineChartConfig } from './lineChartConfig'
import { normalize } from '@lib/utils/math/normalize'
import { LineChart } from '@lib/ui/charts/LineChart'

type ChartDesription = {
  data: number[]
  color: HSLA
}

const Container = styled.div`
  ${takeWholeSpaceAbsolutely};
`

const Content = styled.div`
  position: relative;
  ${takeWholeSpaceAbsolutely};
`

const ChartWrapper = styled.div`
  ${takeWholeSpaceAbsolutely};
`

type ProjectsLineChartsProps = {
  width: number
  chartMin: number
  chartMax: number
}

export const ProjectsLineCharts = ({
  width,
  chartMin,
  chartMax,
}: ProjectsLineChartsProps) => {
  const { projectsRecord } = useProjects()
  const { projectsData, activeProjectId } = useTrackedTimeReport()

  const charts = useMemo(() => {
    if (activeProjectId) {
      const data = projectsData[activeProjectId]
      return [
        {
          data: normalize([...data, chartMin, chartMax]).slice(0, -2),
          color: projectsRecord[activeProjectId].hslaColor,
        },
      ]
    }

    const entries = Object.entries(projectsData).filter(
      ([, data]) => sum(data) > 0,
    )

    const result: ChartDesription[] = []
    const ordered = order(entries, ([, data]) => sum(data), 'desc')
    const totals = mergeSameSizeDataArrays(ordered.map(([, data]) => data))
    const normalizedTotals = normalize([...totals, chartMin, chartMax]).slice(
      0,
      -2,
    )
    ordered.forEach(([projectId], index) => {
      const { hslaColor } = projectsRecord[projectId]

      const area = mergeSameSizeDataArrays(
        ordered.slice(index).map(([, data]) => data),
      )
      const chartData = normalizedTotals.map((dataPoint, index) => {
        return totals[index] > 0 ? (area[index] / totals[index]) * dataPoint : 0
      })

      result.push({
        data: chartData,
        color: hslaColor,
      })
    })

    return result
  }, [activeProjectId, chartMax, chartMin, projectsData, projectsRecord])

  return (
    <Container>
      <Content>
        {charts.map((chart, index) => (
          <ChartWrapper key={index}>
            <LineChart
              dataPointsConnectionKind="sharp"
              fillKind={activeProjectId ? 'gradient' : 'solid'}
              data={chart.data}
              width={width}
              height={lineChartConfig.chartHeight}
              color={chart.color}
            />
          </ChartWrapper>
        ))}
      </Content>
    </Container>
  )
}
