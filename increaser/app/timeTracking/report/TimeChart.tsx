import { BarChart } from '@lib/ui/charts/BarChart'
import { VStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled, { useTheme } from 'styled-components'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { useMemo } from 'react'
import { mergeSameSizeDataArrays } from '@lib/utils/math/mergeSameSizeDataArrays'
import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { addMonths, format } from 'date-fns'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'

const Container = styled(VStack)`
  flex: 1;
  min-width: 320px;
  overflow-x: auto;
`

export const TimeChart = () => {
  const {
    projectsData,
    firstTimeGroupStartedAt,
    timeGrouping,
    activeProjectId,
  } = useTrackedTimeReport()

  const { projectsRecord } = useProjects()
  const theme = useTheme()

  const data = useMemo(() => {
    if (activeProjectId) {
      return projectsData[activeProjectId]
    }

    return mergeSameSizeDataArrays(Object.values(projectsData))
  }, [activeProjectId, projectsData])

  return (
    <Container>
      <BarChart
        minBarWidth={64}
        expectedLabelHeight={16}
        height={160}
        items={data.map((value, index) => {
          const label = match(timeGrouping, {
            day: () =>
              format(
                firstTimeGroupStartedAt + convertDuration(index, 'd', 'ms'),
                'd MMM',
              ),
            week: () =>
              `week #${format(
                firstTimeGroupStartedAt + convertDuration(index, 'w', 'ms'),
                'I',
              )}`,
            month: () =>
              format(addMonths(firstTimeGroupStartedAt, index), 'MMM yyyy'),
          })
          return {
            value,
            label: <Text>{label}</Text>,
            color: activeProjectId
              ? projectsRecord[activeProjectId].hslaColor
              : theme.colors.foreground,

            renderValue:
              value > 0
                ? () => (
                    <Text>{formatDuration(value, 's', { maxUnit: 'h' })}</Text>
                  )
                : undefined,
          }
        })}
      />
    </Container>
  )
}
