import { EnhancedProject } from 'projects/Project'
import { ComponentProps } from 'react'
import { Text } from '@increaser/ui/text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'

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
