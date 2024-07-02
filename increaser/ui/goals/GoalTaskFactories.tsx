import { useMemo } from 'react'
import { useCurrentGoal } from './CurrentGoalProvider'
import { useAssertUserState } from '../user/UserStateContext'
import { taskCadenceName } from '@increaser/entities/TaskFactory'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Text } from '@lib/ui/text'

export const GoalTaskFactories = () => {
  const { taskFactories } = useCurrentGoal()
  const { taskFactories: taskFactoriesRecord } = useAssertUserState()

  const text = useMemo(() => {
    return shouldBePresent(taskFactories)
      .map((id, index) => {
        const { task, cadence } = taskFactoriesRecord[id]
        const taskNameWithDot = task.name.endsWith('.')
          ? task.name
          : `${task.name}.`
        return `${index + 1}. ${
          taskCadenceName[cadence]
        }, I will ${taskNameWithDot}`
      })
      .join('\n')
  }, [taskFactories, taskFactoriesRecord])

  return <Text>{text}</Text>
}
