import { HStack, VStack } from '@increaser/ui/layout/Stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@increaser/ui/layout/StackSeparatedBy'
import { WEEKDAYS } from '@increaser/utils/time'
import { ProjectTotal } from 'projects/components/ProjectTotal'
import { ProjectsAllocationLine } from 'projects/components/ProjectsAllocationLine'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { getProjectName } from 'projects/utils/getProjectName'
import { useDayOverview } from './DayOverviewProvider'
import { Text } from '@increaser/ui/text'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { useWeekTimeAllocation } from 'weekTimeAllocation/hooks/useWeekTimeAllocation'
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectsTotalRecord } from 'projects/helpers/getProjectsTotalRecord'
import { useTheme } from 'styled-components'
import { getWeekday } from '@increaser/utils/time/getWeekday'

export const AmountOverview = () => {
  const { sets, dayStartedAt } = useDayOverview()
  const setsTotal = getSetsSum(sets)
  const { allocation } = useWeekTimeAllocation()
  const weekday = getWeekday(new Date(dayStartedAt))

  const allocatedMinutes = allocation ? allocation[weekday] : 0
  const projectsTotal = getProjectsTotalRecord(sets)

  const { projectsRecord } = useProjects()
  const theme = useTheme()

  return (
    <VStack fullWidth gap={8}>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text weight="semibold" color="supporting" size={14}>
            {WEEKDAYS[weekday]}
          </Text>
          <HStackSeparatedBy
            separator={<Text color="shy">{slashSeparator}</Text>}
          >
            <Text size={14} weight="semibold">
              {formatDuration(setsTotal, 'ms')}
            </Text>
            <Text size={14} weight="semibold" color="shy">
              {formatDuration(allocatedMinutes, 'min')}
            </Text>
          </HStackSeparatedBy>
        </HStack>
        <ProjectsAllocationLine
          projectsRecord={projectsRecord}
          sets={sets}
          allocatedMinutes={allocatedMinutes}
        />
      </VStack>

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
