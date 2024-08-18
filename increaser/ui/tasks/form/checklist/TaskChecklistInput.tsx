import { TaskChecklistItem } from '@increaser/entities/Task'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { TaskChecklistItemInput } from './TaskChecklistItemInput'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ChecklistItemDragHandle } from './ChecklistItemDragHandle'
import styled, { css } from 'styled-components'
import { FieldArrayAddButton } from '@lib/ui/form/components/FieldArrayAddButton'
import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { match } from '@lib/utils/match'
import { DnDList } from '@lib/dnd/DnDList'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { Wrap } from '@lib/ui/base/Wrap'

type TaskChecklistInputProps = InputProps<TaskChecklistItem[]>

const DraggableItemContainer = styled(HStack)<{
  isDragging?: boolean
}>`
  width: 100%;
  gap: 8px;
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.4;
    `}
`

const getDefaultFields = () => ({
  name: '',
  completed: false,
  order: 0,
  id: getId(),
})

export const TaskChecklistInput = ({
  value,
  onChange,
}: TaskChecklistInputProps) => {
  const items = sortEntitiesWithOrder(value)

  return (
    <FieldArrayContainer title="Checklist">
      {value.length > 0 && (
        <DnDList
          items={items}
          getItemId={(item) => item.id}
          onChange={(id, { index }) => {
            const order = getNewOrder({
              orders: items.map((item) => item.order),
              sourceIndex: items.findIndex((item) => item.id === id),
              destinationIndex: index,
            })

            onChange(
              sortEntitiesWithOrder(
                items.map((item) =>
                  item.id === id ? { ...item, order } : item,
                ),
              ),
            )
          }}
          renderList={({ props }) => <VStack {...props} />}
          renderItem={({ item, draggableProps, dragHandleProps, status }) => {
            return (
              <Wrap
                wrap={
                  status === 'overlay'
                    ? (children) => (
                        <TightListItemDragOverlay>
                          {children}
                        </TightListItemDragOverlay>
                      )
                    : undefined
                }
              >
                <DraggableItemContainer
                  isDragging={status === 'placeholder'}
                  {...draggableProps}
                >
                  <ChecklistItemDragHandle
                    isActive={status === 'overlay'}
                    {...dragHandleProps}
                  />
                  <TaskChecklistItemInput
                    onRemove={() => {
                      onChange(value.filter((v) => v.id !== item.id))
                    }}
                    onSubmit={(cursorPosition) => {
                      if (cursorPosition === 'middle') return

                      const itemIndex = items.findIndex((i) => i.id === item.id)

                      const order = match(cursorPosition, {
                        start: () =>
                          itemIndex === 0
                            ? item.order - 1
                            : (items[itemIndex - 1].order + item.order) / 2,
                        end: () =>
                          itemIndex === items.length - 1
                            ? item.order + 1
                            : (items[itemIndex + 1].order + item.order) / 2,
                      })
                      onChange([
                        ...value,
                        {
                          ...getDefaultFields(),
                          order,
                        },
                      ])
                    }}
                    value={item}
                    onChange={(updatedItem) => {
                      onChange(
                        value.map((item) =>
                          item.id === updatedItem.id ? updatedItem : item,
                        ),
                      )
                    }}
                  />
                </DraggableItemContainer>
              </Wrap>
            )
          }}
        />
      )}
      <FieldArrayAddButton
        onClick={() => {
          onChange([
            ...value,
            {
              ...getDefaultFields(),
              order: getLastItemOrder(value.map((value) => value.order)),
            },
          ])
        }}
      >
        Add an item
      </FieldArrayAddButton>
    </FieldArrayContainer>
  )
}
