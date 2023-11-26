import { Text } from '@increaser/ui/text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

export const SliceStatement = ({
  emoji,
  text,
}: {
  emoji: string
  text: string
}) => (
  <Text color="supporting" size={20} weight="semibold">
    <EmojiTextPrefix emoji={emoji} />
    {text}
  </Text>
)
