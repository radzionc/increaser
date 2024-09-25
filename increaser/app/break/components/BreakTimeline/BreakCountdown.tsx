import { useBreak } from '@increaser/app/break/hooks/useBreak'
import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { HStackSeparatedBy } from '@lib/ui/layout/StackSeparatedBy'
import { Text } from '@lib/ui/text'
import { AnimatedDuration } from '@lib/ui/time/AnimatedDuration'

export const BreakCountdown = () => {
  const { breakDuration } = useBreak()
  const lastSetEnd = useLastSetEnd()
  const todayStartedAt = useStartOfDay()

  if (!lastSetEnd || todayStartedAt > lastSetEnd) return null

  return (
    <HStackSeparatedBy
      separator={<Text color="shy">{breakDuration ? '/' : ''}</Text>}
      gap={8}
      wrap="wrap"
    >
      <Text as="div" weight="600" size={40} height="small">
        <AnimatedDuration getDuration={() => Date.now() - lastSetEnd} />
      </Text>
      <Text color={breakDuration ? 'supporting' : 'shy'} weight="600">
        {breakDuration
          ? breakDuration === 'long'
            ? 'long break'
            : `${breakDuration} min break`
          : 'since last session'}
      </Text>
    </HStackSeparatedBy>
  )
}
