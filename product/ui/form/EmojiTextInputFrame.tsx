import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

export const EmojiTextInputFrame = styled(HStack)`
  padding: 0;

  width: 100%;

  > * {
    &:first-child {
      padding: 8px;
      padding-right: 0;
    }
    &:nth-child(2) {
      min-height: 100%;
      padding: ${toSizeUnit(panelDefaultPadding)};
      padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
    }
  }
`
