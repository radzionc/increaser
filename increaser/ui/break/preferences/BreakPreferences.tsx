import { HStack, VStack } from '@lib/ui/css/stack'
import { AutoBreakPreference } from '../automation/preference/AutoBreakPreference'
import { DefaultBreakDurationPreference } from '../duration/DefaultBreakDurationPreference'
import { Text } from '@lib/ui/text'

export const BreakPreferences = () => {
  return (
    <VStack gap={8}>
      <Text size={16} color="contrast">
        Break preferences
      </Text>
      <HStack alignItems="center" justifyContent="space-between" gap={8}>
        <DefaultBreakDurationPreference />
        <AutoBreakPreference />
      </HStack>
    </VStack>
  )
}
