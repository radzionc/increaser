import { HStack, hStack } from '@lib/ui/css/stack'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useCurrentProject } from '@product/ui/projects/CurrentProjectProvider'
import styled from 'styled-components'

import { useProjectDoneMinutesThisWeek } from '../../hooks/useProjectDoneMinutesThisWeek'
import { useCurrentDayTarget } from '../hooks/useCurrentDayTarget'

import { ProjectBudgetDiff } from './ProjectBudgetDiff'

const Container = styled.div`
  ${hStack({
    alignItems: 'center',
    gap: 16,
    justifyContent: 'space-between',
  })}
`

export const ProjectBudgetSummary = () => {
  const { id } = useCurrentProject()

  const target = useCurrentDayTarget()

  const doneMinutesThisWeek = useProjectDoneMinutesThisWeek(id)

  return (
    <Container>
      <HStack alignItems="center" gap={16}>
        <LabeledValue labelColor="supporting" name="Done">
          {formatDuration(doneMinutesThisWeek, 'min')}
        </LabeledValue>
        <LabeledValue labelColor="supporting" name="Expected">
          {formatDuration(target, 'min')}
        </LabeledValue>
      </HStack>
      <ProjectBudgetDiff value={doneMinutesThisWeek - target} />
    </Container>
  )
}
