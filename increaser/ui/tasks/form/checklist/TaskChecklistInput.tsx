import { TaskChecklistItem } from '@increaser/entities/Task'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { TaskChecklistItemInput } from './TaskChecklistItemInput'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ChecklistItemDragHandle } from './ChecklistItemDragHandle'
import styled, { css } from 'styled-components'
import { order } from '@lib/utils/array/order'
import { FieldArrayAddButton } from '@lib/ui/form/components/FieldArrayAddButton'
import { FieldArrayContainer } from '@lib/ui/form/components/FieldArrayContainer'
import { match } from '@lib/utils/match'
import { DnDList } from '@lib/dnd/DnDList'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'

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
  const items = order(value, (item) => item.order, 'asc')

  return (
    <FieldArrayContainer title="Checklist">
      {value.length > 0 && (
        <DnDList
          items={items}
          getItemId={(item) => item.id}
          getItemOrder={(item) => item.order}
          onChange={(id, { order }) => {
            onChange(
              value.map((item) => (item.id === id ? { ...item, order } : item)),
            )
          }}
          renderList={({ content, containerProps }) => (
            <VStack {...containerProps}>{content}</VStack>
          )}
          renderItem={({
            item,
            draggableProps,
            dragHandleProps,
            isDragging,
          }) => {
            return (
              <DraggableItemContainer
                isDragging={isDragging}
                {...draggableProps}
              >
                <ChecklistItemDragHandle
                  isActive={isDragging ?? false}
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
            )
          }}
          renderDragOverlay={({ item }) => (
            <TightListItemDragOverlay>
              <DraggableItemContainer>
                <ChecklistItemDragHandle isActive={true} />
                <TaskChecklistItemInput
                  onRemove={() => {}}
                  onSubmit={() => {}}
                  value={item}
                  onChange={() => {}}
                />
              </DraggableItemContainer>
            </TightListItemDragOverlay>
          )}
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
