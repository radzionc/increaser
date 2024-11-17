import { VStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import styled from 'styled-components'

export const PrincipleItemContainer = styled(VStack)`
  ${verticalPadding(tightListItemConfig.verticalPadding)};
  gap: 4px;
`
