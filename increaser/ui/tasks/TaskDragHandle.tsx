import {
  checklistItemContentMinHeight,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import styled from 'styled-components'

export const TaskDragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(
    checklistItemContentMinHeight + checklistItemVerticalPadding * 2,
  )};
`
