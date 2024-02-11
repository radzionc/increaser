import { order } from '@lib/utils/array/order'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { ReactNode, useCallback, useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd'
import { getRecordKeys } from '@lib/utils/record/getRecordKeys'
import styled, { css } from 'styled-components'
import { HStack } from '@lib/ui/layout/Stack'
import { getColor, matchColor } from '@lib/ui/theme/getters'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { centerContent } from '@lib/ui/css/centerContent'
import { defaultTransition } from '@lib/ui/css/transition'
import { GripVerticalIcon } from '@lib/ui/icons/GripVerticalIcon'

const dragHandleWidth = 36

const DragHandle = styled.div<{ isDragging?: boolean }>`
  position: absolute;
  left: -${toSizeUnit(dragHandleWidth)};
  height: 100%;
  width: ${toSizeUnit(dragHandleWidth)};
  font-size: 20px;
  ${centerContent};
  color: ${matchColor('isDragging', {
    true: 'contrast',
    false: 'textSupporting',
  })};
  transition: color ${defaultTransition};
  ${({ isDragging }) =>
    !isDragging &&
    css`
      &:hover {
        color: ${getColor('text')};
      }
    `}

  @media (hover: hover) and (pointer: fine) {
    &:not(:focus-within) {
      opacity: ${({ isDragging }) => (isDragging ? 1 : 0)};
    }
  }
`

const ItemWrapper = styled(HStack)<{ isDisabled?: boolean }>`
  width: 100%;
  align-items: center;
  position: relative;
  background: ${getColor('background')};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `}

  &:hover ${DragHandle} {
    opacity: 1;
  }
`

export type ItemChangeParams<K> = {
  order: number
  groupId: K
}

type RenderGroupParams<K> = {
  groupId: K
  content: ReactNode
  containerProps?: Record<string, any>
}

export type DnDGroupsProps<K extends string, I> = {
  groups: Record<K, I[]>
  getGroupOrder: (group: K) => number
  getItemOrder: (item: I) => number
  getItemId: (item: I) => string
  onChange: (itemId: string, params: ItemChangeParams<K>) => void
  renderGroup: (params: RenderGroupParams<K>) => ReactNode
  renderItem: (item: I) => ReactNode
}

export function DnDGroups<K extends string, I>({
  groups,
  getItemOrder,
  getItemId,
  onChange,
  renderGroup,
  renderItem,
  getGroupOrder,
}: DnDGroupsProps<K, I>) {
  const [currentItemId, setCurrentItemId] = useState<string | null>(null)

  const handleDragEnd: OnDragEndResponder = useCallback(
    ({ destination, source, draggableId }) => {
      setCurrentItemId(null)
      if (!destination) {
        return
      }

      const isSameGroup = destination.droppableId === source.droppableId

      if (isSameGroup && destination.index === source.index) {
        return
      }

      const groupId = destination.droppableId as K

      const items = groups[groupId] || []

      onChange(draggableId, {
        order: getNewOrder({
          orders: items.map(getItemOrder),
          sourceIndex: isSameGroup ? source.index : null,
          destinationIndex: destination.index,
        }),
        groupId,
      })
    },
    [getItemOrder, groups, onChange],
  )

  const groupKeys = order(getRecordKeys(groups), getGroupOrder, 'asc')

  return (
    <DragDropContext
      onDragStart={({ draggableId }) => setCurrentItemId(draggableId)}
      onDragEnd={handleDragEnd}
    >
      {groupKeys.map((groupId) => {
        const items = order(groups[groupId] || [], getItemOrder, 'asc')

        return (
          <Droppable droppableId={groupId}>
            {(provided) => {
              return (
                <>
                  {renderGroup({
                    groupId,
                    containerProps: {
                      ...provided.droppableProps,
                      ref: provided.innerRef,
                    },
                    content: (
                      <>
                        {items.map((item, index) => (
                          <Draggable
                            key={getItemId(item)}
                            index={index}
                            draggableId={getItemId(item)}
                          >
                            {(provided, { isDragging }) => (
                              <ItemWrapper
                                ref={provided.innerRef}
                                isDisabled={
                                  currentItemId !== null &&
                                  getItemId(item) !== currentItemId
                                }
                                {...provided.draggableProps}
                              >
                                <DragHandle
                                  {...provided.dragHandleProps}
                                  isDragging={isDragging}
                                >
                                  <GripVerticalIcon />
                                </DragHandle>
                                {renderItem(item)}
                              </ItemWrapper>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </>
                    ),
                  })}
                </>
              )
            }}
          </Droppable>
        )
      })}
    </DragDropContext>
  )
}
