import { VStack } from '@lib/ui/css/stack'
import { Text } from '@lib/ui/text'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUser } from '@product/ui/user/state/user'

import { productToolIconRecord } from '../tools/productToolIconRecord'

import { useCurrentGoal } from './CurrentGoalProvider'
import { GoalSection } from './GoalSection'

export const GoalHabits = () => {
  const { habits } = useCurrentGoal()
  const { habits: habitsRecord } = useUser()

  return (
    <VStack>
      {shouldBePresent(habits).map((id) => {
        if (!habitsRecord[id]) {
          return null
        }
        const { name } = habitsRecord[id]

        const text = `${name}, every day.`
        return (
          <GoalSection key={id} icon={productToolIconRecord.habits}>
            <Text>{text}</Text>
          </GoalSection>
        )
      })}
    </VStack>
  )
}
