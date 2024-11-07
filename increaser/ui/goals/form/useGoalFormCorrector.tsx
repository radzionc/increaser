import { useCallback } from 'react'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import { GoalFormShape } from './GoalFormShape'
import { useUser } from '../../user/state/user'
import { intersection } from '@lib/utils/array/intersection'

export const useGoalFormCorrector = () => {
  const { taskFactories, habits } = useUser()

  return useCallback(
    (value: GoalFormShape) => {
      let result = value

      const taskFactoryIds = getRecordKeys(taskFactories)

      if (value.taskFactories.some((id) => !taskFactoryIds.includes(id))) {
        result = {
          ...result,
          taskFactories: intersection(value.taskFactories, taskFactoryIds),
        }
      }

      const habitIds = getRecordKeys(habits)

      if (value.habits.some((id) => !habitIds.includes(id))) {
        result = {
          ...result,
          habits: intersection(value.habits, habitIds),
        }
      }

      return result
    },
    [habits, taskFactories],
  )
}
