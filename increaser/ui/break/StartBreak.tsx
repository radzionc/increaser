import { Button } from '@lib/ui/buttons/Button'
import { useBreakDuration } from './duration/state/useBreakDuration'
import { useDefaultBreakDuration } from './duration/state/useDefaultBreakDuration'
import { HStack } from '@lib/ui/css/stack'
import { CoffeeIcon } from '@lib/ui/icons/CoffeeIcon'

export const StartBreak = () => {
  const [breakDuration, setBreakDuration] = useBreakDuration()
  const [defaultBreakDuration] = useDefaultBreakDuration()

  if (breakDuration) {
    return null
  }

  return (
    <Button
      onClick={() => setBreakDuration(defaultBreakDuration)}
      kind="secondary"
    >
      <HStack alignItems="center" gap={8}>
        <CoffeeIcon />
        Break
      </HStack>
    </Button>
  )
}
