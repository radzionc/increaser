import { EnhancedProject } from '@increaser/app/projects/Project'
import { ComponentProps } from 'react'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@increaser/app/ui/EmojiTextPrefix'

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
