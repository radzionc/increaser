import { MS_IN_MIN } from '@lib/utils/time'

import { FillingBlock } from './FillingBlock'
import { useTheme } from 'styled-components'
import { useFocusedDuration } from './hooks/useFocusedDuration'
import { useFocusTargetProject } from '@increaser/app/focus/hooks/useFocusTargetProject'
import { useFocusDuration } from '@increaser/app/focus/state/focusDuration'

export const SessionProgress = () => {
  const [focusDuration] = useFocusDuration()

  const { colors } = useTheme()
  const project = useFocusTargetProject()
  const color = project ? colors.getLabelColor(project.color) : colors.mistExtra

  const msPassed = useFocusedDuration()

  return (
    <FillingBlock
      completion={msPassed / (focusDuration * MS_IN_MIN)}
      color={color}
    />
  )
}
