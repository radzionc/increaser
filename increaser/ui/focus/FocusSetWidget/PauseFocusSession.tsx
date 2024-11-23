import { PauseIcon } from '@lib/ui/icons/PauseIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { FocusHeaderIconButton } from './FocusHeaderIconButton'
import { useFocusTargetProject } from '../hooks/useFocusTargetProject'
import { usePauseFocus } from '../hooks/usePauseFocus'
import { useResumeFocus } from '../hooks/useResumeFocus'
import { useAssertFocusStatus } from '../state/focusIntervals'

export const PauseFocusSession = () => {
  const pause = usePauseFocus()
  const resume = useResumeFocus()
  const isPaused = useAssertFocusStatus() === 'paused'
  const project = useFocusTargetProject()

  return (
    <FocusHeaderIconButton
      icon={isPaused ? <PlayIcon /> : <PauseIcon />}
      title={isPaused ? 'Resume focus session' : 'Pause focus session'}
      onClick={() => (isPaused ? resume : pause)()}
      size={'l'}
      isDisabled={
        project ? undefined : 'Select a project to resume focus session'
      }
    />
  )
}
