import { useCurrentGoal } from './CurrentGoalProvider'
import { useAssertUserState } from '../user/UserStateContext'
import { taskCadenceName } from '@increaser/entities/TaskFactory'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Text } from '@lib/ui/text'
import { GoalSection } from './GoalSection'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'
import { VStack } from '@lib/ui/layout/Stack'

export const GoalTaskFactories = () => {
  const { taskFactories } = useCurrentGoal()
  const { taskFactories: taskFactoriesRecord } = useAssertUserState()

  return (
    <VStack>
      {shouldBePresent(taskFactories).map((id) => {
        if (!taskFactoriesRecord[id]) {
          return null
        }
        const { task, cadence } = taskFactoriesRecord[id]

        const text = `${task.name}, ${taskCadenceName[cadence].toLowerCase()}.`
        return (
          <GoalSection icon={<CheckSquareIcon />}>
            <Text>{text}</Text>
          </GoalSection>
        )
      })}
    </VStack>
  )
}
