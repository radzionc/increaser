import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/layout/Stack'

import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const EmojiColorTextInputFrame = styled(HStack)`
  padding: 0;

  width: 100%;

  > * {
    &:first-child {
      padding-right: ${toSizeUnit(panelDefaultPadding / 2)};
    }
    &:nth-child(2) {
      padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
    }
  }

  > * {
    &:last-child {
      padding-left: ${toSizeUnit(panelDefaultPadding / 2)};
    }
  }

  & > * {
    padding: ${toSizeUnit(panelDefaultPadding)};
  }
`
