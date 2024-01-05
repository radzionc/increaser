import React, { useMemo } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { Circle } from '@lib/ui/layout/Circle'
import { PieChart } from '@lib/ui/charts/PieChart'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

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

export const CurrentWeekDistribution = () => {
  const { projects: allProjects } = useProjects()

  const projects = useMemo(
    () =>
      allProjects
        .filter((p) => p.doneMinutesThisWeek)
        .sort((a, b) => b.doneMinutesThisWeek - a.doneMinutesThisWeek),
    [allProjects],
  )

  return (
    <Container>
      <PieChart
        items={projects.map(({ doneMinutesThisWeek, hslaColor }) => ({
          value: doneMinutesThisWeek,
          color: hslaColor,
        }))}
      />
      <Projects>
        {projects.map(({ id, doneMinutesThisWeek, hslaColor, name }) => (
          <React.Fragment key={id}>
            <Circle size={8} background={hslaColor} />
            <Text as="div" weight="semibold" size={14}>
              {formatDuration(doneMinutesThisWeek, 'min', { maxUnit: 'h' })}
            </Text>
            <Text size={14} cropped color="supporting">
              {name}
            </Text>
          </React.Fragment>
        ))}
      </Projects>
    </Container>
  )
}
