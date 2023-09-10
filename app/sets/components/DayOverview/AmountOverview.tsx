import { LabeledValue } from '@increaser/ui/ui/LabeledValue'
import { VStack } from '@increaser/ui/ui/Stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@increaser/ui/ui/StackSeparatedBy'
import { WEEKDAYS } from '@increaser/utils/time'
import { ProjectTotal } from 'projects/components/ProjectTotal'
import { ProjectsAllocationLine } from 'projects/components/ProjectsAllocationLine'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { getProjectName } from 'projects/utils/getProjectName'
import { useDayOverview } from './DayOverviewProvider'
import { Text } from '@increaser/ui/ui/Text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'
import { useWeekday } from '@increaser/ui/hooks/useWeekday'
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectsTotalRecord } from 'projects/helpers/getProjectsTotalRecord'
import { useTheme } from 'styled-components'

export const AmountOverview = () => {
  const theme = useTheme()
  const { sets } = useDayOverview()
  const setsTotal = getSetsSum(sets)
  const { allocation } = useWeekTimeAllocation()
  const weekday = useWeekday()
  const { projectsRecord } = useProjects()

  const allocatedMinutes = allocation ? allocation[weekday] : 0
  const projectsTotal = getProjectsTotalRecord(sets)

  return (
    <VStack fullWidth gap={8}>
      <LabeledValue name={WEEKDAYS[weekday]}>
        <HStackSeparatedBy
          separator={<Text color="shy">{slashSeparator}</Text>}
        >
          <Text weight="semibold">{formatDuration(setsTotal, 'ms')}</Text>
          <Text weight="semibold" color="shy">
            {formatDuration(allocatedMinutes, 'min')}
          </Text>
        </HStackSeparatedBy>
      </LabeledValue>
      <ProjectsAllocationLine
        projectsRecord={projectsRecord}
        sets={sets}
        allocatedMinutes={allocatedMinutes}
      />
      <VStack gap={4} fullWidth>
        {Object.entries(projectsTotal)
          .sort((a, b) => b[1] - a[1])
          .map(([projectId]) => (
            <ProjectTotal
              key={projectId}
              name={getProjectName(projectsRecord, projectId)}
              color={getProjectColor(projectsRecord, theme, projectId)}
              value={projectsTotal[projectId]}
            />
          ))}
      </VStack>
    </VStack>
  )
}
