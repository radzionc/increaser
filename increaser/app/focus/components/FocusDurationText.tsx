import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'

interface FocusDurationTextProps {
  value: number
}

export const FocusDurationText = ({ value }: FocusDurationTextProps) => {
  return (
    <HStack alignItems="center" gap={4}>
      <Text weight="bold">Focus for {value} minutes</Text>
      <PlusIcon />
    </HStack>
  )
}
