import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { ComponentProps, ReactNode } from 'react'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { HStack } from '@lib/ui/css/stack'

type SummaryFrameProps = ComponentProps<typeof Text> & {
  icon?: ReactNode
}

export const SummaryFrame = ({
  children,
  icon,
  ...rest
}: SummaryFrameProps) => (
  <HStack alignItems="center" gap={8}>
    {icon}
    <Text size={14} {...rest}>
      {children}
    </Text>
  </HStack>
)

export const SummaryFrameDuration = ({
  value,
}: ComponentWithValueProps<number>) => (
  <Text as="span" weight="600" color="contrast">
    {formatDuration(value, 'min', {
      maxUnit: 'h',
      kind: 'long',
    })}
  </Text>
)
