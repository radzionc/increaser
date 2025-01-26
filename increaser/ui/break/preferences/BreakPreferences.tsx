import { VStack } from '@lib/ui/css/stack'
import { AutoBreakPreference } from '../automation/preference/AutoBreakPreference'
import { DefaultBreakDurationPreference } from '../duration/DefaultBreakDurationPreference'
import { Text } from '@lib/ui/text'

export const BreakPreferences = () => {
  return (
    <VStack gap={8}>
      <Text color="supporting">Break preferences</Text>
      <DefaultBreakDurationPreference />
      <AutoBreakPreference />
    </VStack>
  )
}
