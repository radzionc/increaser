import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

interface FocusDurationTextProps {
  value: number
  emoji: string
}

export const FocusDurationText = ({ value, emoji }: FocusDurationTextProps) => {
  return (
    <HStack alignItems="center" gap={4}>
      <Text weight="bold">
        <EmojiTextPrefix emoji={emoji} />
        Focus for {value} minutes
      </Text>
      <PlusIcon />
    </HStack>
  )
}
