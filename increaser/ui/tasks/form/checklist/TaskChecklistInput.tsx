import { TaskChecklistItem } from '@increaser/entities/Task'
import { DnDList } from '@lib/dnd/DnDList'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { InputProps } from '@lib/ui/props'
import { TaskChecklistItemInput } from './TaskChecklistItemInput'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { useCallback } from 'react'
import { Text } from '@lib/ui/text'
import { ChecklistItemDragHandle } from './ChecklistItemDragHandle'
import styled from 'styled-components'
import { order } from '@lib/utils/array/order'
import { FieldArrayAddButton } from '@lib/ui/form/components/FieldArrayAddButton'

export type TaskChecklistInputProps = InputProps<TaskChecklistItem[]>

const DraggableItemContainer = styled(HStack)`
  width: 100%;
  gap: 8px;
`

export const TaskChecklistInput = ({
  value,
  onChange,
}: TaskChecklistInputProps) => {
  const onAdd = useCallback(() => {
    onChange([
      ...value,
      {
        id: getId(),
        name: '',
        completed: false,
        order: getLastItemOrder(value.map((value) => value.order)),
      },
    ])
  }, [onChange, value])
  console.log(order(value, (item) => item.order, 'asc'))
  return (
    <VStack gap={16}>
      <Text size={14} weight="semibold">
        Checklist
      </Text>
      {value.length > 0 && (
        <DnDList
          items={order(value, (item) => item.order, 'asc')}
          getItemId={(item) => item.id}
          getItemOrder={(item) => item.order}
          onChange={(id, { order }) => {
            console.log(id, order)
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
              <DraggableItemContainer {...draggableProps}>
                <ChecklistItemDragHandle
                  isActive={isDragging ?? false}
                  {...dragHandleProps}
                />
                <TaskChecklistItemInput
                  onRemove={() => {
                    onChange(value.filter((v) => v.id !== item.id))
                  }}
                  onSubmit={onAdd}
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
        />
      )}
      <FieldArrayAddButton onClick={onAdd}>Add an item</FieldArrayAddButton>
    </VStack>
  )
}
