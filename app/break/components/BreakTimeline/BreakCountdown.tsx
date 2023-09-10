import { useBreak } from 'break/hooks/useBreak'
import { useLastSetEnd } from 'sets/hooks/useLastSetEnd'
import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { HStackSeparatedBy } from '@increaser/ui/ui/StackSeparatedBy'
import { Text } from '@increaser/ui/ui/Text'
import { MS_IN_SEC } from '@increaser/utils/time'
import { SlidingTime } from 'ui/SlidingTime'

export const BreakCountdown = () => {
  const { breakDuration } = useBreak()
  const lastSetEnd = useLastSetEnd()
  const todayStartedAt = useStartOfDay()

  if (!lastSetEnd || todayStartedAt > lastSetEnd) return null

  return (
    <HStackSeparatedBy
      separator={<Text color="shy">{breakDuration ? '/' : ''}</Text>}
    >
      <Text as="div" weight="bold" size={40} height="small">
        <SlidingTime getSeconds={(now) => (now - lastSetEnd) / MS_IN_SEC} />
      </Text>
      <Text color={breakDuration ? 'supporting' : 'shy'} weight="bold">
        {breakDuration
          ? breakDuration === 'long'
            ? 'long break'
            : `${breakDuration} min break`
          : 'since last session'}
      </Text>
    </HStackSeparatedBy>
  )
}
