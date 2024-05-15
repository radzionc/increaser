import { formatDuration } from '@lib/utils/time/formatDuration'
import { Circle } from '@lib/ui/layout/Circle'
import { HSLA } from '@lib/ui/colors/HSLA'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { Seconds } from '@lib/utils/time/types'

interface Props {
  name: string
  color?: HSLA
  value: Seconds
}

export const ProjectTotal = ({ name, color, value }: Props) => {
  return (
    <HStack gap={12} alignItems="center" justifyContent="space-between">
      <HStack gap={8} alignItems="center">
        {color && <Circle size={6} background={color} />}
        <Text style={{ maxWidth: 160 }} cropped color="supporting" size={14}>
          {name}
        </Text>
      </HStack>
      <Text nowrap size={14} weight="semibold" color="supporting">
        {formatDuration(value, 's', { maxUnit: 'h' })}
      </Text>
    </HStack>
  )
}
