import { AutoBreakManager } from './automation/AutoBreakManager'
import { BreakAutoStop } from './BreakAutoStop'
import { useBreakDuration } from './duration/state/useBreakDuration'
import { FloatingBreakWidget } from './widget/FloatingBreakWidget'

export const BreakManager = () => {
  const [breakDuration] = useBreakDuration()

  if (breakDuration) {
    return (
      <>
        <BreakAutoStop />
        <FloatingBreakWidget />
      </>
    )
  }

  return <AutoBreakManager />
}
