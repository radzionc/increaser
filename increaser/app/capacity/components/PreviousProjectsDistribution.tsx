import React, { useMemo } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { sum } from '@lib/utils/array/sum'
import styled, { useTheme } from 'styled-components'
import { Text } from '@lib/ui/text'
import { Circle } from '@lib/ui/layout/Circle'
import { PieChart } from '@lib/ui/charts/PieChart'
import {
  useProjects,
  weeksToDisplay,
} from '@increaser/ui/projects/ProjectsProvider'

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 24px;
  align-items: center;
`

const Projects = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto 80px 1fr;
  align-items: center;
`

export const PreviousProjectsDistribution = () => {
  const { projectsRecord, weeks } = useProjects()

  const theme = useTheme()

  const totals = useMemo(() => {
    const record = {} as Record<string, number>

    weeks.forEach(({ projects }) => {
      projects.forEach(({ id, seconds }) => {
        record[id] = (record[id] || 0) + seconds
      })
    })

    return Object.entries(record)
      .map(([id, seconds]) => ({ id, seconds }))
      .sort((a, b) => b.seconds - a.seconds)
  }, [weeks])

  const total = useMemo(() => sum(totals.map((t) => t.seconds)), [totals])

  if (!total) return null

  return (
    <Container>
      <PieChart
        items={totals.map(({ id, seconds }) => ({
          value: seconds,
          color: theme.colors.getLabelColor(projectsRecord[id].color),
        }))}
      />
      <Projects>
        <Circle size={8} background={theme.colors.textShy} />
        <Text size={14} color="shy">
          weekly avg.
        </Text>
        <div />
        {totals.map(({ id, seconds }) => (
          <React.Fragment key={id}>
            <Circle
              size={8}
              background={theme.colors.getLabelColor(projectsRecord[id].color)}
            />
            <Text as="div" weight="semibold" size={14}>
              {formatDuration(seconds / weeksToDisplay, 's', { maxUnit: 'h' })}
            </Text>
            <Text size={14} cropped color="supporting">
              {projectsRecord[id].name}
            </Text>
          </React.Fragment>
        ))}
      </Projects>
    </Container>
  )
}
