import { HStack } from '@lib/ui/css/stack'
import { AutoBreakPreference } from '../automation/preference/AutoBreakPreference'
import { DefaultBreakDurationPreference } from '../duration/DefaultBreakDurationPreference'

export const BreakPreferences = () => {
  return (
    <HStack alignItems="center" justifyContent="space-between" gap={8}>
      <DefaultBreakDurationPreference />
      <AutoBreakPreference />
    </HStack>
  )
}
