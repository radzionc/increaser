import { Opener } from '@lib/ui/base/Opener'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { ShyFocusButton } from '@increaser/ui/focus/ShyFocusButton'
import { UpdateSetProjectOverlay } from '@increaser/ui/focus/UpdateSetProjectOverlay'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'
import { useProjectEmoji } from '@increaser/ui/projects/hooks/useProjectEmoji'

const Button = styled(ShyFocusButton)`
  color: ${getColor('contrast')};
`

export const FocusProject = () => {
  const { currentSet: optionalCurrentSet } = useFocus()
  const emoji = useProjectEmoji(optionalCurrentSet?.projectId)

  return (
    <Opener
      renderOpener={({ onOpen }) => <Button onClick={onOpen}>{emoji}</Button>}
      renderContent={({ onClose }) => (
        <UpdateSetProjectOverlay onClose={onClose} />
      )}
    />
  )
}
