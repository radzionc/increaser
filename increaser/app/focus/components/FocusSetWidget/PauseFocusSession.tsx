import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useIsFocusPaused } from '@increaser/ui/focus/utils/useIsFocusPaused'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { PauseIcon } from '@lib/ui/icons/PauseIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import styled from 'styled-components'

const Button = styled(IconButton)`
  ${sameDimensions(48)};
  font-size: 24px;
`

export const PauseFocusSession = () => {
  const { pause, resume } = useFocus()
  const isPaused = useIsFocusPaused()

  return (
    <Button
      icon={isPaused ? <PlayIcon /> : <PauseIcon />}
      title={isPaused ? 'Resume focus session' : 'Pause focus session'}
      onClick={() => (isPaused ? resume : pause)()}
      size={'l'}
      // kind="secondary"
    />
  )
}
