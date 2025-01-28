import { ValueProp } from '@lib/ui/props'
import { Text } from '@lib/ui/text'
import { LabeledValue } from '@lib/ui/text/LabeledValue'
import { sum } from '@lib/utils/array/sum'
import { formatDuration } from '@lib/utils/time/formatDuration'

type AvgDayProps = ValueProp<number[]> & {
  name: string
}

export const AvgDay = ({ value, name }: AvgDayProps) => {
  return (
    <LabeledValue labelColor="supporting" name={`Avg. ${name}`}>
      <Text as="span" color="contrast">
        {formatDuration(sum(value) / value.length, 'ms')}
      </Text>
    </LabeledValue>
  )
}
