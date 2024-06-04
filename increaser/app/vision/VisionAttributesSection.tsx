import { VStack } from '@lib/ui/layout/Stack'
import { VisionAttributes } from './VisionAttributes'
import { AddVisionAttribute } from './AddVisionAttribute'
import { ExpandableSection } from '@lib/ui/layout/ExpandableSection'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import { ProductEducationBlock } from '@increaser/ui/education/ProductEducationBlock'
import { ExpandableSectionListTitle } from '@lib/ui/layout/ExpandableSectionListTitle'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

export const VisionAttributesSection = () => {
  const { vision } = useAssertUserState()
  return (
    <ExpandableSection
      defaultIsOpen
      title={
        <ExpandableSectionListTitle
          identifier="🌟"
          count={Object.values(vision).length}
          title="Your perfect life vision"
        />
      }
    >
      <VStack gap={20}>
        <ProductEducationBlock value="vision" />
        <VStack>
          <ActiveItemIdProvider initialValue={null}>
            <VisionAttributes />
            <AddVisionAttribute />
          </ActiveItemIdProvider>
        </VStack>
      </VStack>
    </ExpandableSection>
  )
}
