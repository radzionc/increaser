import { UniqueIdentifier, useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { ReactNode } from 'react'

type RenderParams = {
  containerProps: Record<string, any>
  isDraggingOver: boolean
}

type DnDGroupProps<GroupId extends string, ItemId extends UniqueIdentifier> = {
  id: GroupId
  itemIds: ItemId[]
  render: (params: RenderParams) => ReactNode
}

export function DnDGroup<
  GroupId extends string,
  ItemId extends UniqueIdentifier,
>({ id, itemIds, render }: DnDGroupProps<GroupId, ItemId>) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <SortableContext
      id={id}
      items={itemIds}
      strategy={verticalListSortingStrategy}
    >
      {render({
        isDraggingOver: isOver,
        containerProps: {
          'data-droppable-id': id,
          ref: setNodeRef,
        },
      })}
    </SortableContext>
  )
}
