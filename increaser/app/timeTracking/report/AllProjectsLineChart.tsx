import { useMemo } from 'react'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { sum } from '@lib/utils/array/sum'
import { order } from '@lib/utils/array/order'
import { HSLA } from '@lib/ui/colors/HSLA'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import styled from 'styled-components'
import { takeWholeSpaceAbsolutely } from '@lib/ui/css/takeWholeSpaceAbsolutely'
import { SharpLineChart } from '@lib/ui/charts/LineChart/SharpLineChart'
import { lineChartConfig } from './lineChartConfig'
import { normalize } from '@lib/utils/math/normalize'

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

type AllProjectsLineChartProps = {
  width: number
  chartMin: number
  chartMax: number
}

export const AllProjectsLineChart = ({
  width,
  chartMin,
  chartMax,
}: AllProjectsLineChartProps) => {
  const { projectsRecord } = useProjects()
  const { projectsData } = useTrackedTimeReport()

  const charts = useMemo(() => {
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
  }, [chartMax, chartMin, projectsData, projectsRecord])

  return (
    <Container>
      <Content>
        {charts.map((chart, index) => (
          <ChartWrapper key={index}>
            <SharpLineChart
              fillKind="solid"
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
