import { VStack } from '@lib/ui/css/stack'
import { BreakPreferences } from '../break/preferences/BreakPreferences'
import { TitledSection } from '@lib/ui/layout/TitledSection'
import { WorkPreferences } from './WorkPreferences'

export const ManagePreferences = () => {
  return (
    <VStack style={{ maxWidth: 520 }} gap={40}>
      <TitledSection title="Work preferences">
        <WorkPreferences />
      </TitledSection>
      <TitledSection title="Break preferences">
        <BreakPreferences />
      </TitledSection>
    </VStack>
  )
}
