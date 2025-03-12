import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/css/stack'
import styled from 'styled-components'

import { taskBoardConfig } from '../config'

export const TaskColumnContent = styled(VStack)`
  overflow-y: auto;
  flex: 1 1 auto;
  ${horizontalPadding(taskBoardConfig.columnHorizontalPadding)};

  gap: 8px;
`
