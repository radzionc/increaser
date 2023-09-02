import { getProjectsTotalRecord } from 'projects/helpers/getProjectsTotalRecord'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { Set } from 'sets/Set'
import { useTheme } from 'styled-components'
import { AllocationLine } from 'ui/AllocationLine'
import { MS_IN_MIN } from '@increaser/utils/time'
import { EnhancedProject } from 'projects/Project'

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
