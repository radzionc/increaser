import { HStack, VStack } from '@lib/ui/css/stack'
import {
  HStackSeparatedBy,
  slashSeparator,
} from '@lib/ui/layout/StackSeparatedBy'
import { text, Text } from '@lib/ui/text'
import { useSelectedWeekday } from '@lib/ui/time/SelectedWeekdayProvider'
import { WEEKDAYS } from '@lib/utils/time'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getProjectsTotalRecord } from '@product/entities-utils/project/getProjectsTotalRecord'
import { getSetsDuration } from '@product/entities-utils/set/getSetsDuration'
import { ProjectTotal } from '@product/ui/projects/ProjectTotal'
import { useUser } from '@product/ui/user/state/user'
import { useDaysBudget } from '@product/ui/workBudget/hooks/useDaysBudget'
import Link from 'next/link'
import styled, { useTheme } from 'styled-components'

import { getAppPath } from '../../../navigation/app'
import { ProjectsAllocationLine } from '../../../projects/ProjectsAllocationLine'

import { useDayOverview } from './DayOverviewProvider'

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
