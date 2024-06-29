import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { getAppPath } from '@increaser/ui/navigation/app'
import Link from 'next/link'
import { ProjectGoalShyIndicator } from '../ProjectGoalShyIndicator'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { getSetsDuration } from '@increaser/entities-utils/set/getSetsDuration'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'
import { useCurrentWeekSets } from '../../../sets/hooks/useCurrentWeekSets'

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
`

export const ProjectBudgetWidgetHeader = () => {
  const { allocatedMinutesPerWeek, id, goal, name } = useCurrentProject()

  const currentWeekSets = useCurrentWeekSets()

  const doneMinutesThisWeek = useMemo(
    () =>
      Math.round(
        convertDuration(
          getSetsDuration(
            currentWeekSets.filter(({ projectId }) => projectId === id),
          ),
          'ms',
          'min',
        ),
      ),
    [],
  )

  return (
    <Container>
      <HStack alignItems="center" gap={4}>
        <ProjectGoalShyIndicator value={goal ?? null} />
        <Text weight="semibold" color="contrast">
          {name}
        </Text>
      </HStack>
      <Link href={getAppPath('timePlanning')}>
        <HStackSeparatedBy separator="/">
          <Text weight="semibold" color="contrast">
            {doneMinutesThisWeek > 0
              ? formatDuration(doneMinutesThisWeek, 'min', {
                  maxUnit: 'h',
                })
              : '-'}
          </Text>
          {allocatedMinutesPerWeek > 0 && (
            <Text color="supporting" weight="semibold">
              {formatDuration(allocatedMinutesPerWeek, 'min', {
                maxUnit: 'h',
              })}
            </Text>
          )}
        </HStackSeparatedBy>
      </Link>
    </Container>
  )
}
