import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'
import { PauseIcon } from '@lib/ui/icons/PauseIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { FocusHeaderIconButton } from './FocusHeaderIconButton'

export const PauseFocusSession = () => {
  const { pause, resume } = useFocus()
  const isPaused = useIsFocusPaused()

  return (
    <FocusHeaderIconButton
      icon={isPaused ? <PlayIcon /> : <PauseIcon />}
      title={isPaused ? 'Resume focus session' : 'Pause focus session'}
      onClick={() => (isPaused ? resume : pause)()}
      size={'l'}
    />
  )
}
