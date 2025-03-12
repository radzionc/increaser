import { Text } from '@lib/ui/text'
import { AnimatedDuration } from '@lib/ui/time/AnimatedDuration'
import { useLastSetEnd } from '@product/app/sets/hooks/useLastSetEnd'

export const BreakCountdown = () => {
  const lastSetEnd = useLastSetEnd()

  if (!lastSetEnd) return null

  return (
    <Text as="div" weight="600" size={60} height="s">
      <AnimatedDuration getDuration={() => Date.now() - lastSetEnd} />
    </Text>
  )
}
