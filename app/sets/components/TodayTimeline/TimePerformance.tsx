import { formatTime } from '@increaser/utils/formatTime'
import { ClockIcon } from '@increaser/ui/ui/icons/ClockIcon'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'

interface Props {
  timestamp: number
}

export const TimePerformance = ({ timestamp }: Props) => (
  <HStack alignItems="center" gap={6}>
    <Text
      style={{
        display: 'flex',
      }}
      color="supporting"
    >
      <ClockIcon />
    </Text>
    <Text weight="bold">{formatTime(timestamp)}</Text>
  </HStack>
)
