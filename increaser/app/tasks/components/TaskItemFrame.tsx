import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'
import { verticalMargin } from '@lib/ui/css/verticalMargin'

export const taskItemMinHeight = 40
export const taskItemActionSize = 24

export const TaskItemFrame = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: ${toSizeUnit(taskItemActionSize)} 1fr auto;
  gap: 12px;
  font-weight: 500;
  min-height: ${toSizeUnit(taskItemMinHeight)};
  justify-items: start;

  > * {
    ${verticalMargin((taskItemMinHeight - taskItemActionSize) / 2)}
    line-height: ${toSizeUnit(taskItemActionSize)};
  }
`
