import { AutoBreakManager } from './automation/AutoBreakManager'
import { BreakAutoStop } from './BreakAutoStop'
import { useBreakDuration } from './duration/state/useBreakDuration'

export const BreakManager = () => {
  const [breakDuration] = useBreakDuration()

  if (breakDuration) {
    return <BreakAutoStop />
  }

  return <AutoBreakManager />
}
