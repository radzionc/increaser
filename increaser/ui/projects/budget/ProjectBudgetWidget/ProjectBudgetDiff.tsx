import { ValueProp } from '@lib/ui/props'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useCurrentProject } from '../../CurrentProjectProvider'
import { HStack } from '@lib/ui/css/stack'
import { ProjectBudgetDiffIndicator } from './ProjectBudgetDiffIndicator'
import { Minutes } from '@lib/utils/time/types'

export const ProjectBudgetDiff = ({ value }: ValueProp<Minutes>) => {
  const { goal } = useCurrentProject()

  if (!value) return null

  let strContent = formatDuration(Math.abs(value), 'min')
  if (value > 0) {
    strContent = `+${strContent}`
  }

  return (
    <HStack alignItems="center" gap={8}>
      {goal && <ProjectBudgetDiffIndicator />}
      <LabeledValue labelColor="supporting" name="Difference">
        {strContent}
      </LabeledValue>
    </HStack>
  )
}
