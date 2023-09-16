import { HStack, VStack } from '@increaser/ui/ui/Stack'
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
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectsTotalRecord } from 'projects/helpers/getProjectsTotalRecord'
import styled, { useTheme } from 'styled-components'
import { getWeekday } from '@increaser/utils/time/getWeekday'

const Container = styled(VStack)``

export const AmountOverview = () => {
  const theme = useTheme()
  const { sets, dayStartedAt } = useDayOverview()
  const setsTotal = getSetsSum(sets)
  const { allocation } = useWeekTimeAllocation()
  const weekday = getWeekday(new Date(dayStartedAt))
  console.log(dayStartedAt, weekday)
  const { projectsRecord } = useProjects()

  const allocatedMinutes = allocation ? allocation[weekday] : 0
  const projectsTotal = getProjectsTotalRecord(sets)

  return (
    <Container fullWidth gap={8}>
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
    </Container>
  )
}
