import { useProjects } from 'projects/hooks/useProjects'
import React, { useMemo } from 'react'
import { formatDuration } from 'shared/utils/formatDuration'
import styled from 'styled-components'
import { Circle } from '@increaser/ui/ui/Circle'
import { PieChart } from '@increaser/ui/ui/PieChart'
import { Text } from '@increaser/ui/ui/Text'

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
              {formatDuration(doneMinutesThisWeek, 'min')}
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
