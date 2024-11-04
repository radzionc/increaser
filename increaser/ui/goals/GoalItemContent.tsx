import { VStack } from '@lib/ui/css/stack'
import { text } from '@lib/ui/text'
import styled from 'styled-components'
import { useCurrentGoal } from './CurrentGoalProvider'
import { GoalDeadline } from './GoalDeadline'
import { GoalPlan } from './GoalPlan'
import { GoalStatusTag } from './GoalStatusTag'
import { NonEmptyOnly } from '@lib/ui/base/NonEmptyOnly'
import { CurrentTaskFactoryProvider } from '../taskFactories/CurrentTaskFactoryProvider'
import { useUser } from '../user/state/user'
import { GoalTaskFactoryItem } from './GoalTaskFactoryItem'
import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { CurrentHabitProvider } from '../habits/CurrentHabitProvider'
import { HabitItemContent } from '../habits/components/manage/HabitItemContent'

const Header = styled.p`
  ${text({
    centerVertically: true,
    color: 'contrast',
    size: 18,
  })}

  gap: 12px;
  text-align: start;
`

export const LinkedEntitiesContainer = styled(FieldArrayContainer)`
  gap: 4px;
`

export const GoalItemContent = () => {
  const { name, emoji, plan, taskFactories, habits } = useCurrentGoal()

  const { taskFactories: taskFactoryRecord, habits: habitRecord } = useUser()

  return (
    <VStack style={{ maxWidth: 600 }} gap={12}>
      <VStack gap={8}>
        <Header>
          <span>{emoji}</span>
          {name}
          <GoalStatusTag />
        </Header>
        {plan && <GoalPlan />}
        <GoalDeadline />
      </VStack>
      <NonEmptyOnly
        value={taskFactories}
        render={(items) => (
          <LinkedEntitiesContainer title="Recurring tasks">
            <VStack>
              {items.map((id) => {
                return (
                  <CurrentTaskFactoryProvider
                    key={id}
                    value={taskFactoryRecord[id]}
                  >
                    <GoalTaskFactoryItem />
                  </CurrentTaskFactoryProvider>
                )
              })}
            </VStack>
          </LinkedEntitiesContainer>
        )}
      />
      <NonEmptyOnly
        value={habits}
        render={(items) => (
          <LinkedEntitiesContainer title="Daily habitrs">
            <VStack>
              {items.map((id) => {
                return (
                  <CurrentHabitProvider key={id} value={habitRecord[id]}>
                    <HabitItemContent />
                  </CurrentHabitProvider>
                )
              })}
            </VStack>
          </LinkedEntitiesContainer>
        )}
      />
    </VStack>
  )
}
