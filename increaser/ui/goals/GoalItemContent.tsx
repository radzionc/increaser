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
import { CurrentPrincipleProvider } from '../principles/CurrentPrincipleProvider'
import { GoalPrincipleItem } from './form/GoalPrincipleItem'

const Header = styled.p`
  ${text({
    centerVertically: true,
    color: 'contrast',
    size: 16,
    weight: 600,
  })}

  gap: 12px;
  text-align: start;
`

export const LinkedEntitiesContainer = styled(FieldArrayContainer)`
  gap: 4px;
`

export const GoalItemContent = () => {
  const { name, emoji, plan, taskFactories, habits, principles } =
    useCurrentGoal()

  const {
    taskFactories: taskFactoryRecord,
    habits: habitRecord,
    principles: principlesRecord,
  } = useUser()

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
                const value = taskFactoryRecord[id]
                if (!value) return null

                return (
                  <CurrentTaskFactoryProvider key={id} value={value}>
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
                const value = habitRecord[id]
                if (!value) return null

                return (
                  <CurrentHabitProvider key={id} value={value}>
                    <HabitItemContent />
                  </CurrentHabitProvider>
                )
              })}
            </VStack>
          </LinkedEntitiesContainer>
        )}
      />
      <NonEmptyOnly
        value={principles}
        render={(items) => (
          <LinkedEntitiesContainer title="Principles">
            <VStack>
              {items.map((id) => {
                const value = principlesRecord[id]
                if (!value) return null

                return (
                  <CurrentPrincipleProvider key={id} value={value}>
                    <GoalPrincipleItem />
                  </CurrentPrincipleProvider>
                )
              })}
            </VStack>
          </LinkedEntitiesContainer>
        )}
      />
    </VStack>
  )
}
