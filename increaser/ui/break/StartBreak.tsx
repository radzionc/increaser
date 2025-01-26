import { Button } from '@lib/ui/buttons/Button'
import { useBreakDuration } from './duration/state/useBreakDuration'
import { useDefaultBreakDuration } from './duration/state/useDefaultBreakDuration'

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
      Take a break
    </Button>
  )
}
