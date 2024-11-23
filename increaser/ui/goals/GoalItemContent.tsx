import { vStack, VStack } from '@lib/ui/css/stack'
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
import { VisionBoardItem } from '../vision/VisionBoardItem'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { GoalLinkedEntities } from './GoalLinkedEntities'

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

export const VisionContainer = styled.div`
  column-gap: 8px;
  column-width: 240px;
  width: 100%;

  margin-top: 4px;

  > * {
    margin-bottom: 8px;
  }
`

const LinkedEntitiesContent = styled.div`
  ${vStack({
    gap: 8,
  })};
  > * {
    ${verticalPadding(0)}
  }
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
      <VStack gap={4}>
        <Header>
          <span>{emoji}</span>
          {name}
          <GoalStatusTag />
        </Header>
        <GoalDeadline />
      </VStack>
      {plan && <GoalPlan />}
      <NonEmptyOnly
        value={vision}
        render={(items) => (
          <GoalLinkedEntities title={goalLinkedEntityTitle.vision}>
            <VisionContainer>
              {items.map((id) => {
                const value = visionRecord[id]
                if (!value) return null

                return (
                  <CurrentVisionAttributeProvider key={id} value={value}>
                    <VisionBoardItem />
                  </CurrentVisionAttributeProvider>
                )
              })}
            </VisionContainer>
          </GoalLinkedEntities>
        )}
      />
      <NonEmptyOnly
        value={taskFactories}
        render={(items) => (
          <GoalLinkedEntities title={goalLinkedEntityTitle.taskFactory}>
            <LinkedEntitiesContent>
              {items.map((id) => {
                const value = taskFactoryRecord[id]
                if (!value) return null

                return (
                  <CurrentTaskFactoryProvider key={id} value={value}>
                    <GoalTaskFactoryItem />
                  </CurrentTaskFactoryProvider>
                )
              })}
            </LinkedEntitiesContent>
          </GoalLinkedEntities>
        )}
      />
      <NonEmptyOnly
        value={habits}
        render={(items) => (
          <GoalLinkedEntities title={goalLinkedEntityTitle.habit}>
            <LinkedEntitiesContent>
              {items.map((id) => {
                const value = habitRecord[id]
                if (!value) return null

                return (
                  <CurrentHabitProvider key={id} value={value}>
                    <HabitItemContent />
                  </CurrentHabitProvider>
                )
              })}
            </LinkedEntitiesContent>
          </GoalLinkedEntities>
        )}
      />
      <NonEmptyOnly
        value={principles}
        render={(items) => (
          <GoalLinkedEntities title={goalLinkedEntityTitle.principle}>
            <LinkedEntitiesContent>
              {items.map((id) => {
                const value = principlesRecord[id]
                if (!value) return null

                return (
                  <CurrentPrincipleProvider key={id} value={value}>
                    <GoalPrincipleItem />
                  </CurrentPrincipleProvider>
                )
              })}
            </LinkedEntitiesContent>
          </GoalLinkedEntities>
        )}
      />
    </VStack>
  )
}
