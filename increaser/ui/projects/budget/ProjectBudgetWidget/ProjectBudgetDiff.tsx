import { ComponentWithValueProps } from '@lib/ui/props'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { useCurrentProject } from '../../CurrentProjectProvider'
import { HStack } from '@lib/ui/css/stack'
import { ProjectBudgetDiffIndicator } from './ProjectBudgetDiffIndicator'

export const ProjectBudgetDiff = ({
  value,
}: ComponentWithValueProps<number>) => {
  const { goal } = useCurrentProject()

  if (!value) return null

  let strContent = formatDuration(value, 'min')
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
