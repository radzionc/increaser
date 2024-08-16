import { Active, UniqueIdentifier } from '@dnd-kit/core'
import { DnDGroupsItemLocation } from './DnDGroupsItemLocation'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

type Input<ItemId extends UniqueIdentifier> = {
  item: Active
  getItemIndex: (itemId: ItemId) => number
}

export const getDndGroupsItemSource = <
  GroupId extends string,
  ItemId extends UniqueIdentifier,
>({
  item,
  getItemIndex,
}: Input<ItemId>): DnDGroupsItemLocation<GroupId> => {
  const groupId = shouldBePresent(item.data.current).sortable
    .containerId as GroupId

  const index = getItemIndex(item.id as ItemId)

  return {
    groupId,
    index,
  }
}
