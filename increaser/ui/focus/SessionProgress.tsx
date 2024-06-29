import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { MS_IN_MIN } from '@lib/utils/time'

import { FillingBlock } from './FillingBlock'
import { useFocus } from './FocusContext'
import { useCurrentFocus } from './CurrentFocusProvider'
import { useAssertUserState } from '../user/UserStateContext'
import { useTheme } from 'styled-components'

export const SessionProgress = () => {
  const now = useRhythmicRerender()

  const { focusDuration } = useFocus()
  const { startedAt, projectId } = useCurrentFocus()

  const { projects } = useAssertUserState()
  const theme = useTheme()
  const color = theme.colors.getLabelColor(projects[projectId].color)

  const msPassed = now - startedAt

  return (
    <FillingBlock
      completion={msPassed / (focusDuration * MS_IN_MIN)}
      color={color}
    />
  )
}
