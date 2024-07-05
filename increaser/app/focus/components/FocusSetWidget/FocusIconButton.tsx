import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import styled from 'styled-components'

export const focusIconSize =
  tightListItemConfig.lineHeight + tightListItemConfig.verticalPadding * 2

export const FocusIconButton = styled(IconButton)`
  ${sameDimensions(focusIconSize)};
`
