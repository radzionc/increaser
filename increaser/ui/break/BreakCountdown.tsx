import { useLastSetEnd } from '@increaser/app/sets/hooks/useLastSetEnd'
import { AnimatedDuration } from '@lib/ui/time/AnimatedDuration'
import { Text } from '@lib/ui/text'

export const BreakCountdown = () => {
  const lastSetEnd = useLastSetEnd()

  if (!lastSetEnd) return null

  return (
    <Text as="div" weight="600" size={60} height="s">
      <AnimatedDuration getDuration={() => Date.now() - lastSetEnd} />
    </Text>
  )
}
