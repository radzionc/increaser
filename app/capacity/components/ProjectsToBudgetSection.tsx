import { getProjectOverBudgetTime } from 'projects/utils/getProjectOverBudgetTime'
import React from 'react'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled, { useTheme } from 'styled-components'
import { Circle } from '@increaser/ui/ui/Circle'
import { Text } from '@increaser/ui/ui/Text'
import { AllocationLine } from 'ui/AllocationLine'
import { CheckCircleIcon } from '@increaser/ui/ui/icons/CheckCircleIcon'
import { EnhancedProject } from 'projects/Project'

interface ProjectsToBudgetSectionProps {
  projects: EnhancedProject[]
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 80px 60px 80px;
  align-items: center;
  gap: 8px;
`

export const ProjectsToBudgetSection = ({
  projects,
}: ProjectsToBudgetSectionProps) => {
  const theme = useTheme()

  if (!projects.length) {
    return null
  }

  return (
    <Container>
      <Circle size={8} background={theme.colors.mist} />
      <Text size={14} color="shy">
        Project
      </Text>
      <Text size={14} color="shy">
        Total
      </Text>
      <Text size={14} color="shy">
        Progress
      </Text>
      <Text style={{ justifySelf: 'end' }} size={14} color="shy">
        Left
      </Text>

      {projects.map((project) => (
        <React.Fragment key={project.id}>
          <Circle size={8} background={project.hslaColor} />
          <Text size={14} color="supporting">
            {project.name}
          </Text>
          <Text weight="semibold" size={14} color="supporting">
            {formatDuration(project.doneMinutesThisWeek, 'min', {
              maxUnit: 'h',
            })}
          </Text>
          {project.allocatedMinutesPerWeek > 0 ? (
            <AllocationLine
              segments={[
                {
                  proportion:
                    project.doneMinutesThisWeek /
                    project.allocatedMinutesPerWeek,
                  color:
                    project.doneMinutesThisWeek >
                    project.allocatedMinutesPerWeek
                      ? project.hslaColor
                      : theme.colors.textSupporting,
                },
              ]}
            />
          ) : (
            <div />
          )}
          <Text
            size={14}
            color={
              project.doneMinutesThisWeek > project.allocatedMinutesPerWeek
                ? 'regular'
                : 'supporting'
            }
            as="div"
            style={{ justifySelf: 'end' }}
          >
            {project.doneMinutesThisWeek > project.allocatedMinutesPerWeek ? (
              <Text as="div" color="regular" style={{ display: 'flex' }}>
                <CheckCircleIcon />
              </Text>
            ) : (
              <Text>
                {formatDuration(
                  Math.abs(getProjectOverBudgetTime(project)),
                  'min',
                  { maxUnit: 'h' },
                )}
              </Text>
            )}
          </Text>
        </React.Fragment>
      ))}
    </Container>
  )
}
