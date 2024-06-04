import { VStack } from '@lib/ui/layout/Stack'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { AddGoal } from '@increaser/ui/goals/AddGoal'
import { Goals } from '@increaser/ui/goals/Goals'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { useAssertUserState } from '../user/UserStateContext'
import { ExpandableSectionListTitle } from '@lib/ui/layout/ExpandableSectionListTitle'

export const GoalsSection = () => {
  const { goals } = useAssertUserState()
  return (
    <ExpandableSection
      title={
        <ExpandableSectionListTitle
          identifier="🎯"
          count={Object.values(goals).length}
          title="Your goals"
        />
      }
      defaultIsOpen
    >
      <VStack gap={20}>
        <ProductEducationBlock value="goals" />
        <VStack>
          <ActiveItemIdProvider initialValue={null}>
            <Goals />
            <AddGoal />
          </ActiveItemIdProvider>
        </VStack>
      </VStack>
    </ExpandableSection>
  )
}
