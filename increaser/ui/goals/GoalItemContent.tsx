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
import { goalLinkedEntityTitle } from './form/linkedEntity/GoalLinkedEntity'
import { CurrentVisionAttributeProvider } from '../vision/CurrentVisionAttributeProvider'
import { GoalVisionItem } from './form/GoalVisionItem'

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
  const { name, emoji, plan, taskFactories, habits, principles, vision } =
    useCurrentGoal()

  const {
    taskFactories: taskFactoryRecord,
    habits: habitRecord,
    principles: principlesRecord,
    vision: visionRecord,
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
        value={vision}
        render={(items) => (
          <LinkedEntitiesContainer title={goalLinkedEntityTitle.vision}>
            <VStack>
              {items.map((id) => {
                const value = visionRecord[id]
                if (!value) return null

                return (
                  <CurrentVisionAttributeProvider key={id} value={value}>
                    <GoalVisionItem />
                  </CurrentVisionAttributeProvider>
                )
              })}
            </VStack>
          </LinkedEntitiesContainer>
        )}
      />
      <NonEmptyOnly
        value={taskFactories}
        render={(items) => (
          <LinkedEntitiesContainer title={goalLinkedEntityTitle.taskFactory}>
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
          <LinkedEntitiesContainer title={goalLinkedEntityTitle.habit}>
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
          <LinkedEntitiesContainer title={goalLinkedEntityTitle.principle}>
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
