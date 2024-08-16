import { Over, UniqueIdentifier } from '@dnd-kit/core'
import { DnDGroupsItemLocation } from './DnDGroupsItemLocation'

type Input<ItemId extends UniqueIdentifier> = {
  item: Over
  getItemIndex: (itemId: ItemId) => number
}

export const getDndGroupsItemDestination = <
  GroupId extends string,
  ItemId extends UniqueIdentifier,
>({
  item,
  getItemIndex,
}: Input<ItemId>): DnDGroupsItemLocation<GroupId> => {
  const destinationItem = item.data.current

  if (destinationItem) {
    const groupId = destinationItem.sortable.containerId as GroupId
    const index = getItemIndex(item.id as ItemId)

    return {
      groupId,
      index,
    }
  }

  return {
    groupId: item.id as GroupId,
    index: 0,
  }
}
