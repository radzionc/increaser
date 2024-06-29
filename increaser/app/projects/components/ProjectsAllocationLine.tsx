import { getProjectsTotalRecord } from '@increaser/app/projects/helpers/getProjectsTotalRecord'
import { useTheme } from 'styled-components'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { MS_IN_MIN } from '@lib/utils/time'
import { Set } from '@increaser/entities/User'
import { Project } from '@increaser/entities/Project'

interface Props {
  sets: Set[]
  allocatedMinutes: number
  projectsRecord: Record<string, Project>
}

export const ProjectsAllocationLine = ({
  sets,
  allocatedMinutes,
  projectsRecord,
}: Props) => {
  const projectsTotal = getProjectsTotalRecord(sets)
  const theme = useTheme()

  return (
    <AllocationLine
      height={4}
      segments={Object.entries(projectsTotal)
        .sort((a, b) => b[1] - a[1])
        .map(([projectId, ms]) => ({
          color: theme.colors.getLabelColor(projectsRecord[projectId].color),
          proportion: ms / MS_IN_MIN / allocatedMinutes,
        }))}
    />
  )
}
