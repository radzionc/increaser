import { useCurrentGoal } from './CurrentGoalProvider'
import { useUser } from '@increaser/ui/user/state/user'
import { taskCadenceName } from '@increaser/entities/TaskFactory'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Text } from '@lib/ui/text'
import { GoalSection } from './GoalSection'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { VStack } from '@lib/ui/css/stack'

export const GoalTaskFactories = () => {
  const { taskFactories } = useCurrentGoal()
  const { taskFactories: taskFactoriesRecord } = useUser()

  return (
    <VStack>
      {shouldBePresent(taskFactories).map((id) => {
        if (!taskFactoriesRecord[id]) {
          return null
        }
        const { name, cadence } = taskFactoriesRecord[id]

        const text = `${name}, ${taskCadenceName[cadence].toLowerCase()}.`
        return (
          <GoalSection key={id} icon={<CheckSquareIcon />}>
            <Text>{text}</Text>
          </GoalSection>
        )
      })}
    </VStack>
  )
}
