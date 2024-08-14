import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { taskBoardConfig } from '../config'

export const TaskColumnContent = styled(VStack)`
  gap: 8px;
  overflow-y: auto;

  z-index: 1;
  flex: 1;
  overflow-y: auto;
  ${horizontalPadding(taskBoardConfig.columnHorizontalPadding)};
`
