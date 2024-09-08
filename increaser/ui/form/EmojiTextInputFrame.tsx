import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'

import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const EmojiTextInputFrame = styled(HStack)`
  padding: 0;

  width: 100%;

  > * {
    &:first-child {
      padding: 8px;
      padding-right: 0;
    }
    &:last-child {
      padding: ${toSizeUnit(panelDefaultPadding)};
      padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
      min-height: 100%;
    }
  }
`
