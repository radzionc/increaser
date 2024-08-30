import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import styled from 'styled-components'

export const FocusIconButton = styled(IconButton)`
  ${sameDimensions(tightListItemMinHeight)};
  font-size: 16px;
`
