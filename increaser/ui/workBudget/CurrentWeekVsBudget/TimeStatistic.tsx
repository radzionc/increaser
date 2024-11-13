import { HSLA } from '@lib/ui/colors/HSLA'
import { Circle } from '@lib/ui/layout/Circle'
import { HStack } from '@lib/ui/css/stack'
import { ComponentWithValueProps } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { EmphasizeNumbers } from '@lib/ui/text/EmphasizeNumbers'
import { formatDuration } from '@lib/utils/time/formatDuration'

type TimeStatisticProps = ComponentWithValueProps<number | undefined> & {
  color?: HSLA
  name: string
  isSigned?: boolean
}

export const TimeStatistic = ({
  value,
  name,
  color,
  isSigned,
}: TimeStatisticProps) => {
  return (
    <>
      <HStack alignItems="center" gap={6}>
        <Circle size={6} background={color} />
        <Text color="supporting">{name}:</Text>
      </HStack>
      <Text weight="500" color="contrast">
        {value ? (
          <EmphasizeNumbers
            value={`${isSigned && value > 0 ? '+' : ''}${formatDuration(
              Math.abs(value),
              'min',
              {
                maxUnit: 'h',
              },
            )}`}
          />
        ) : (
          '-'
        )}
      </Text>
    </>
  )
}
