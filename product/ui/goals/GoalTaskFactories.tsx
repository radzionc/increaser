import { VStack } from '@lib/ui/css/stack'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { Text } from '@lib/ui/text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { taskCadenceName } from '@product/entities/TaskFactory'
import { useUser } from '@product/ui/user/state/user'

import { useCurrentGoal } from './CurrentGoalProvider'
import { GoalSection } from './GoalSection'

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
