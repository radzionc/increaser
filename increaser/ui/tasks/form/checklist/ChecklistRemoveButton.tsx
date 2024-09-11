import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { ClickableComponentProps } from '@lib/ui/props'

export const ChecklistRemoveButton = ({ onClick }: ClickableComponentProps) => (
  <IconButton
    kind="alert"
    onClick={onClick}
    icon={<TrashBinIcon />}
    title="Remove item"
  />
)
