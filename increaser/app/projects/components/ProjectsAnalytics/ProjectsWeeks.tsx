import { useMemo } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { BarSegment, BasicBarChart } from '@increaser/app/ui/BasicBarChart'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

export const sortSegments = (segments: BarSegment[]) =>
  [...segments].sort((a, b) => a.value - b.value)

export const ProjectsWeeks = () => {
  const { weeks } = useProjects()

  const theme = useTheme()

  const bars = useMemo(
    () =>
      weeks.map(({ projects, week }, index) => {
        const segments: BarSegment[] = projects.map(({ seconds }) => ({
          color: theme.colors.mist,
          value: seconds,
        }))

        const seconds = sum(segments.map((s) => s.value))

        return {
          segments: sortSegments(segments),
          displayValue:
            seconds > 0 ? (
              <Text color="supporting">
                {formatDuration(seconds, 's', { maxUnit: 'h' })}
              </Text>
            ) : undefined,
          label: index === weeks.length - 1 ? 'Last week' : `Week #${week}`,
        }
      }),
    [theme.colors.mist, weeks],
  )

  return <BasicBarChart height={140} bars={bars} />
}
