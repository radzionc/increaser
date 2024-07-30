import { MS_IN_MIN } from '@lib/utils/time'

import { FillingBlock } from './FillingBlock'
import { useFocus } from './FocusContext'
import { useCurrentFocus } from './CurrentFocusProvider'
import { useAssertUserState } from '../user/UserStateContext'
import { useTheme } from 'styled-components'
import { useFocusedDuration } from './hooks/useFocusedDuration'
import { getLastItem } from '@lib/utils/array/getLastItem'

export const SessionProgress = () => {
  const { focusDuration } = useFocus()

  const { projects } = useAssertUserState()
  const theme = useTheme()
  const { intervals } = useCurrentFocus()
  const { projectId } = getLastItem(intervals)
  const color = theme.colors.getLabelColor(projects[projectId].color)

  const msPassed = useFocusedDuration()

  return (
    <FillingBlock
      completion={msPassed / (focusDuration * MS_IN_MIN)}
      color={color}
    />
  )
}
