import { HStack, VStack } from '@lib/ui/layout/Stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { WEEKDAYS } from '@lib/utils/time'
import { ProjectTotal } from '@increaser/app/projects/components/ProjectTotal'
import { ProjectsAllocationLine } from '@increaser/app/projects/components/ProjectsAllocationLine'
import { getProjectColor } from '@increaser/ui/projects/utils/getProjectColor'
import { getProjectName } from '@increaser/app/projects/utils/getProjectName'
import { useDayOverview } from './DayOverviewProvider'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getSetsSum } from '@increaser/app/sets/helpers/getSetsSum'
import { getProjectsTotalRecord } from '@increaser/app/projects/helpers/getProjectsTotalRecord'
import { useTheme } from 'styled-components'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useDaysBudget } from '@increaser/ui/workBudget/hooks/useDaysBudget'

export const AmountOverview = () => {
  const { sets, dayStartedAt } = useDayOverview()
  const setsTotal = getSetsSum(sets)
  const weekday = getWeekday(new Date(dayStartedAt))

  const daysBudget = useDaysBudget()
  const currentDayBudget = daysBudget[weekday]
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
              {formatDuration(currentDayBudget, 'h')}
            </Text>
          </HStackSeparatedBy>
        </HStack>
        <ProjectsAllocationLine
          projectsRecord={projectsRecord}
          sets={sets}
          allocatedMinutes={convertDuration(currentDayBudget, 'h', 'min')}
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
