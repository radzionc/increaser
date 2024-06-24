import { IconButton } from '@lib/ui/buttons/IconButton'
import { checklistItemContentMinHeight } from '@lib/ui/checklist/ChecklistItemFrame'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { ClickableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'

const Container = styled(IconButton)`
  ${sameDimensions(checklistItemContentMinHeight)};
  ${borderRadius.xs};
`

export const ChecklistRemoveButton = ({ onClick }: ClickableComponentProps) => (
  <Container
    kind="alert"
    size="s"
    onClick={onClick}
    icon={<TrashBinIcon />}
    title="Remove item"
  />
)
