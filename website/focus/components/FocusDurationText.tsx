import { PlusIcon } from '@increaser/ui/icons/PlusIcon'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
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
