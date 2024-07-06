import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import { tightListItemMinHeight } from '@lib/ui/list/tightListItemConfig'
import styled from 'styled-components'

export const TaskDragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(tightListItemMinHeight)};
`
