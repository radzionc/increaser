import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import styled from 'styled-components'

export const TaskDragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(
    tightListItemConfig.lineHeight + tightListItemConfig.verticalPadding * 2,
  )};
`
