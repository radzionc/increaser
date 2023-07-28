import { useMemo } from 'react'
import { getSetsSum } from 'sets/helpers/getSetsSum'
import { Set } from 'sets/Set'
import { formatDuration } from 'shared/utils/formatDuration'
import {
  HStackSeparatedBy,
  dotSeparator,
} from '@increaser/ui/ui/StackSeparatedBy'
import { Text } from '@increaser/ui/ui/Text'
import { MS_IN_MIN } from 'utils/time'

interface Props {
  sets: Set[]
}

export const DayVolumeAnalytics = ({ sets }: Props) => {
  const totalMs = useMemo(() => getSetsSum(sets), [sets])

  return (
    <HStackSeparatedBy separator={<Text color="shy">{dotSeparator}</Text>}>
      <Text color="supporting">
        <Text weight="semibold" color="regular" as="span">
          {formatDuration(Math.round(totalMs / MS_IN_MIN), 'min')}
        </Text>{' '}
        total
      </Text>
      <Text color="supporting">
        <Text weight="semibold" color="regular" as="span">
          {formatDuration(Math.round(totalMs / sets.length / MS_IN_MIN), 'min')}
        </Text>{' '}
        avg. set
      </Text>
    </HStackSeparatedBy>
  )
}
