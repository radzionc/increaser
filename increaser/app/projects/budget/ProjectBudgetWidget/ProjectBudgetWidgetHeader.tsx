import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentProject } from '../../components/ProjectView/CurrentProjectProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import Link from 'next/link'
import { ProjectGoalShyIndicator } from '../ProjectGoalShyIndicator'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
  position: relative;
`

export const ProjectBudgetWidgetHeader = () => {
  const { allocatedMinutesPerWeek, doneMinutesThisWeek, goal, name } =
    useCurrentProject()

  return (
    <Container>
      <HStack alignItems="center" gap={4}>
        <ProjectGoalShyIndicator value={goal ?? null} />
        <Text weight="semibold" color="contrast" size={14}>
          {name}
        </Text>
      </HStack>
      <Link href={AppPath.ProjectsBudget}>
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
              })}{' '}
            </Text>
          )}
        </HStackSeparatedBy>
      </Link>
    </Container>
  )
}
