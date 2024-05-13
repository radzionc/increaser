import { ComponentProps } from 'react'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'

type Props = ComponentProps<typeof Text> & {
  emojiSize?: number
  project: Pick<EnhancedProject, 'emoji' | 'name'>
}

export const ProjectNameWithEmoji = ({
  project: { name, emoji },
  ...rest
}: Props) => {
  return (
    <Text cropped as="span" {...rest}>
      <EmojiTextPrefix emoji={emoji} />
      {name}
    </Text>
  )
}
