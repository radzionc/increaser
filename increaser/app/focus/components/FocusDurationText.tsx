import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'

interface FocusDurationTextProps {
  value: number
  emoji?: string
}

export const FocusDurationText = ({ value, emoji }: FocusDurationTextProps) => {
  return (
    <HStack alignItems="center" gap={4}>
      <Text weight="bold">
        {emoji && <EmojiTextPrefix emoji={emoji} />}
        Focus for {value} minutes
      </Text>
      <PlusIcon />
    </HStack>
  )
}
