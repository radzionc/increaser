import { IconButton } from '@lib/ui/buttons/IconButton'
import { useYouTubePlayerPosition } from './state/useYouTubePlayerPosition'
import { RectangleCornerIcon } from '@lib/ui/icons/RectangleCornerIcon'

export const ManageYouTubePlayerPosition = () => {
  const [position] = useYouTubePlayerPosition()

  return (
    <IconButton
      kind="secondary"
      title="Reposition the player"
      icon={<RectangleCornerIcon value={position} />}
    />
  )
}
