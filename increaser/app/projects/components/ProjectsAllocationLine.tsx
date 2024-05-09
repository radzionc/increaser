import { getProjectsTotalRecord } from '@increaser/app/projects/helpers/getProjectsTotalRecord'
import { useTheme } from 'styled-components'
import { AllocationLine } from '@increaser/app/ui/AllocationLine'
import { MS_IN_MIN } from '@lib/utils/time'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { getProjectColor } from '@increaser/ui/projects/utils/getProjectColor'
import { Set } from '@increaser/entities/User'

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
  const projectsTotal = getProjectsTotalRecord(sets)
  const theme = useTheme()

  return (
    <AllocationLine
      height={4}
      segments={Object.entries(projectsTotal)
        .sort((a, b) => b[1] - a[1])
        .map(([projectId, ms]) => ({
          color: getProjectColor(projectsRecord, theme, projectId),
          proportion: ms / MS_IN_MIN / allocatedMinutes,
        }))}
    />
  )
}
