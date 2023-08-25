import { Text } from '@increaser/ui/ui/Text'
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
