import { ProjectTotal } from 'projects/components/ProjectTotal'
import { getProjectsTotalRecord } from 'projects/helpers/getProjectsTotalRecord'
import { useMemo } from 'react'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { Set } from 'sets/Set'
import { useTheme } from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'
import { AllocationLine } from 'ui/AllocationLine'
import { EnhancedProject } from 'projects/Project'

interface Props {
  sets: Set[]
  projectsRecord: Record<string, EnhancedProject>
}

export const DayProjects = ({ sets, projectsRecord }: Props) => {
  const projectsTotal = useMemo(() => getProjectsTotalRecord(sets), [sets])

  const totalMs = useMemo(() => getSetsSum(sets), [sets])

  const orderedProjectsIds = useMemo(
    () =>
      Object.keys(projectsTotal).sort(
        (a, b) => projectsTotal[b] - projectsTotal[a],
      ),
    [projectsTotal],
  )

  const theme = useTheme()

  return (
    <>
      {orderedProjectsIds.map((projectId) => {
        const project = projectsRecord[projectId]
        if (!project) return null

        const { color, name } = project
        const projectTotal = projectsTotal[projectId]

        return (
          <VStack key={projectId} fullWidth gap={2}>
            <ProjectTotal
              value={projectTotal}
              key={projectId}
              name={name}
              color={theme.colors.getLabelColor(color)}
            />
            <AllocationLine
              height={4}
              segments={[
                {
                  color: theme.colors.textShy,
                  proportion: projectTotal / totalMs,
                },
              ]}
            />
          </VStack>
        )
      })}
    </>
  )
}
