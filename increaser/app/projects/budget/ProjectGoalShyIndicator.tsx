import { ComponentWithValueProps } from '@lib/ui/props'
import { ProjectGoal } from '@increaser/entities/Project'
import { match } from '@lib/utils/match'
import { Text } from '@lib/ui/text'

export const ProjectGoalShyIndicator = ({
  value,
}: ComponentWithValueProps<ProjectGoal>) => {
  return (
    <Text
      as="span"
      color={match(value, {
        doMore: () => 'success',
        doLess: () => 'alert',
      })}
    >
      {match(value, {
        doMore: () => 'min',
        doLess: () => 'max',
      })}
    </Text>
  )
}
