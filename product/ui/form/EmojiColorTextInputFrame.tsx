import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

export const EmojiColorTextInputFrame = styled(HStack)`
  padding: 0;

  width: 100%;

  > * {
    &:first-child {
      padding: 8px;
      padding-right: 0;
    }
    &:nth-child(2) {
      padding: 0;
      padding-top: 8px;
    }
    &:nth-child(3) {
      min-height: 100%;
      padding: ${toSizeUnit(panelDefaultPadding)};
      padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
    }
  }
`
