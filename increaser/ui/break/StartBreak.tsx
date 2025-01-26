import { Button } from '@lib/ui/buttons/Button'
import { useBreakDuration } from './duration/state/useBreakDuration'
import { useDefaultBreakDuration } from './duration/state/useDefaultBreakDuration'

export const StartBreak = () => {
  const [, setBreakDuration] = useBreakDuration()
  const [defaultBreakDuration] = useDefaultBreakDuration()

  return (
    <Button
      onClick={() => setBreakDuration(defaultBreakDuration)}
      kind="secondary"
    >
      Start Break
    </Button>
  )
}
