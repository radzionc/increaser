import { HStack } from '@lib/ui/css/stack'
import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { formatDuration } from '@lib/utils/time/formatDuration'
import { ComponentProps, ReactNode } from 'react'

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

export const SummaryFrameDuration = ({ value }: ValueProp<number>) => (
  <Text as="span" weight="600" color="contrast">
    {formatDuration(value, 'min', {
      maxUnit: 'h',
      kind: 'l',
    })}
  </Text>
)
