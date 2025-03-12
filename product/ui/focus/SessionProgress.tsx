import { MS_IN_MIN } from '@lib/utils/time'
import { useFocusTargetProject } from '@product/ui/focus/hooks/useFocusTargetProject'
import { useFocusDuration } from '@product/ui/focus/state/focusDuration'
import { useTheme } from 'styled-components'

import { FillingBlock } from './FillingBlock'
import { useFocusedDuration } from './hooks/useFocusedDuration'

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
