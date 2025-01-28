import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { OnClickProp } from '@lib/ui/props'

export const ChecklistRemoveButton = ({ onClick }: OnClickProp) => (
  <IconButton
    kind="alert"
    onClick={onClick}
    icon={<TrashBinIcon />}
    title="Remove sub-task"
  />
)
