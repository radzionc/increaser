import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/layout/Stack'
import styled from 'styled-components'
import { taskBoardConfig } from '../config'

export const TaskColumnContent = styled(VStack)`
  overflow-y: auto;
  flex: 1;
  ${horizontalPadding(taskBoardConfig.columnHorizontalPadding)};

  gap: 8px;
`
