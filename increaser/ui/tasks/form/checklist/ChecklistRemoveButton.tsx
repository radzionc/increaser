import { IconButton } from '@lib/ui/buttons/IconButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { ClickableComponentProps } from '@lib/ui/props'
import styled from 'styled-components'

const Container = styled(IconButton)`
  ${sameDimensions(
    tightListItemConfig.verticalPadding * 2 + tightListItemConfig.lineHeight,
  )};
  ${borderRadius.xs};
`

export const ChecklistRemoveButton = ({ onClick }: ClickableComponentProps) => (
  <Container
    kind="alertSecondary"
    size="s"
    onClick={onClick}
    icon={<TrashBinIcon />}
    title="Remove item"
  />
)
