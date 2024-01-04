import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import styled from 'styled-components'

import { UpdateFocusDurationOverlay } from './CurrentSetDuration'
import { Opener } from '@lib/ui/base/Opener'
import { getColor } from '@lib/ui/theme/getters'
import { Button } from '@lib/ui/buttons/Button'

const TimeButton = styled(Button)`
  color: ${getColor('text')};
  font-weight: 600;
  :hover {
    color: ${getColor('contrast')};
  }
`

export const FocusGoal = () => {
  const { focusDuration } = useFocus()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <TimeButton size="xs" onClick={onOpen} kind="secondary">
          {focusDuration} min
        </TimeButton>
      )}
      renderContent={({ onClose }) => (
        <UpdateFocusDurationOverlay onClose={onClose} />
      )}
    />
  )
}
