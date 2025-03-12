import { VStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

import { taskBoardConfig } from '../config'

export const ColumnFooter = styled(VStack)`
  flex-shrink: 0;
  width: 100%;
  padding: ${toSizeUnit(taskBoardConfig.columnHorizontalPadding)};
`
