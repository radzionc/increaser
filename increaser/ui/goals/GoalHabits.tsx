import { useCurrentGoal } from './CurrentGoalProvider'
import { useUser } from '@increaser/ui/user/state/user'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { Text } from '@lib/ui/text'
import { GoalSection } from './GoalSection'
import { VStack } from '@lib/ui/css/stack'
import { productToolIconRecord } from '../tools/productToolIconRecord'

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
