import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { taskBoardConfig } from '../config'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const ColumnFooter = styled(VStack)`
  flex-shrink: 0;
  width: 100%;
  padding: ${toSizeUnit(taskBoardConfig.columnHorizontalPadding)};
`
