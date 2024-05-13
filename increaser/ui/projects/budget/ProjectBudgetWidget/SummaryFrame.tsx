import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { ComponentProps } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'

type SummaryFrameProps = ComponentProps<typeof Text> & {
  emoji: string
}

export const SummaryFrame = ({
  children,
  emoji,
  ...rest
}: SummaryFrameProps) => (
  <Text size={14} {...rest}>
    <EmojiTextPrefix emoji={emoji} /> {children}
  </Text>
)

export const SummaryFrameDuration = ({
  value,
}: ComponentWithValueProps<number>) => (
  <Text as="span" weight="bold" color="contrast">
    {formatDuration(value, 'min', {
      maxUnit: 'h',
      kind: 'long',
    })}
  </Text>
)
