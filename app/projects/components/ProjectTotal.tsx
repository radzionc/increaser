import { formatDuration } from '@increaser/utils/time/formatDuration'
import { Circle } from '@increaser/ui/layout/Circle'
import { HSLA } from '@increaser/ui/colors/HSLA'
import { HStack } from '@increaser/ui/layout/Stack'
import { Text } from '@increaser/ui/text'

interface Props {
  name: string
  color?: HSLA
  value: number
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
        {formatDuration(value, 'ms', { maxUnit: 'h' })}
      </Text>
    </HStack>
  )
}
