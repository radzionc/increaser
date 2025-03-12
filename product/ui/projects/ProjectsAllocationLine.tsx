import { MS_IN_MIN } from '@lib/utils/time'
import { AllocationLine } from '@product/app/ui/AllocationLine'
import { Project } from '@product/entities/Project'
import { Set } from '@product/entities/User'
import { getProjectsTotalRecord } from '@product/entities-utils/project/getProjectsTotalRecord'
import { useTheme } from 'styled-components'

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
