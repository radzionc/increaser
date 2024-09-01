import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'

export const TaskTextContainer = styled(Text)`
  line-height: ${toSizeUnit(tightListItemConfig.lineHeight)};
  word-break: break-word;
  width: 100%;
  text-align: start;

  & > *:not(:last-child) {
    margin-right: 8px;
  }

  > * {
    margin-right: 8px;
  }
`
