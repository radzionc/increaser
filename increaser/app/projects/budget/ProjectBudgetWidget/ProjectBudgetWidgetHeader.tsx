import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import styled from 'styled-components'
import { useCurrentProject } from '../../components/ProjectView/CurrentProjectProvider'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import Link from 'next/link'
import { ProjectGoalShyIndicator } from '../ProjectGoalShyIndicator'

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
`

export const ProjectBudgetWidgetHeader = () => {
  const { allocatedMinutesPerWeek, doneMinutesThisWeek, goal } =
    useCurrentProject()

  return (
    <Container>
      <LabeledValue labelColor="supporting" name="This week">
        <Text color="contrast">
          {doneMinutesThisWeek > 0
            ? formatDuration(doneMinutesThisWeek, 'min', {
                maxUnit: 'h',
              })
            : '-'}
        </Text>
      </LabeledValue>
      {allocatedMinutesPerWeek > 0 && (
        <Link href={AppPath.ProjectsBudget}>
          <LabeledValue labelColor="supporting" name={goal ? 'Goal' : 'Budget'}>
            <HStack alignItems="center" gap={4}>
              <Text weight="bold" color="contrast">
                {formatDuration(allocatedMinutesPerWeek, 'min', {
                  maxUnit: 'h',
                })}{' '}
                {goal && <ProjectGoalShyIndicator value={goal} />}
              </Text>
            </HStack>
          </LabeledValue>
        </Link>
      )}
    </Container>
  )
}
