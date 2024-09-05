import { HStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { taskBoardConfig } from '../config'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

export const ColumnHeader = styled(HStack)`
  flex-shrink: 0;
  padding: ${toSizeUnit(taskBoardConfig.columnHorizontalPadding)};
`

export const ColumnContent = styled(HStack)`
  height: 32px;
  align-items: center;
  ${horizontalPadding(taskBoardConfig.columnHorizontalPadding)};
`
