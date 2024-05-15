import { useTheme } from 'styled-components'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { getProjectColor } from '@increaser/ui/projects/utils/getProjectColor'
import { Set } from '@increaser/entities/User'
import { setsToTimeSpentOnProjects } from '@increaser/entities-utils/set/setsToTimeSpentOnProjects'
import { convertDuration } from '@lib/utils/time/convertDuration'

interface Props {
  sets: Set[]
  allocatedMinutes: number
  projectsRecord: Record<string, EnhancedProject>
}

export const ProjectsAllocationLine = ({
  sets,
  allocatedMinutes,
  projectsRecord,
}: Props) => {
  const projectsTotal = setsToTimeSpentOnProjects(sets)
  const theme = useTheme()

  return (
    <AllocationLine
      height={4}
      segments={Object.entries(projectsTotal)
        .sort((a, b) => b[1] - a[1])
        .map(([projectId, seconds]) => ({
          color: getProjectColor(projectsRecord, theme, projectId),
          proportion: convertDuration(seconds, 's', 'min') / allocatedMinutes,
        }))}
    />
  )
}
