import { HStack, VStack } from '@lib/ui/css/stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { WEEKDAYS } from '@lib/utils/time'
import { ProjectTotal } from '@increaser/ui/projects/ProjectTotal'
import { text, Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import styled, { useTheme } from 'styled-components'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useDaysBudget } from '@increaser/ui/workBudget/hooks/useDaysBudget'
import { useUser } from '@increaser/ui/user/state/user'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { ProjectsAllocationLine } from '../../../projects/ProjectsAllocationLine'
import { getProjectsTotalRecord } from '@increaser/entities-utils/project/getProjectsTotalRecord'
import { useDayOverview } from './DayOverviewProvider'
import Link from 'next/link'
import { getAppPath } from '../../../navigation/app'

const Budget = styled(Link)`
  ${text({
    color: 'supporting',
  })}

  &:hover {
    ${text({
      color: 'contrast',
    })}
  }
`

export const AmountOverview = () => {
  const [weekday] = useSelectedWeekday()
  const { sets } = useDayOverview()
  const setsTotal = getSetsDuration(sets)

  const daysBudget = useDaysBudget()
  const currentDayBudget = daysBudget[weekday]
  const projectsTotal = getProjectsTotalRecord(sets)

  const { projects } = useUser()
  const theme = useTheme()

  return (
    <VStack fullWidth gap={8}>
      <VStack gap={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text weight="500" color="supporting" size={14}>
            {WEEKDAYS[weekday]}
          </Text>
          <HStackSeparatedBy
            separator={<Text color="shy">{slashSeparator}</Text>}
            gap={8}
            wrap="wrap"
          >
            <Text>{formatDuration(setsTotal, 'ms')}</Text>
            <Budget href={getAppPath('preferences')}>
              {formatDuration(currentDayBudget, 'h')}
            </Budget>
          </HStackSeparatedBy>
        </HStack>
        <ProjectsAllocationLine
          projectsRecord={projects}
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
              name={projects[projectId].name}
              color={theme.colors.getLabelColor(projects[projectId].color)}
              value={projectsTotal[projectId]}
            />
          ))}
      </VStack>
    </VStack>
  )
}
