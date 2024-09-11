import { TaskChecklistItem } from '@increaser/entities/Task'
import { HStack, VStack } from '@lib/ui/css/stack'
import { DraggingAwareComponentProps, InputProps } from '@lib/ui/props'
import { TaskChecklistItemInput } from './TaskChecklistItemInput'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { ChecklistItemDragHandle } from './ChecklistItemDragHandle'
import styled, { css } from 'styled-components'
import { match } from '@lib/utils/match'
import { DnDList } from '@lib/dnd/DnDList'
import { TightListItemDragOverlay } from '@lib/ui/list/TightListItemDragOverlay'
import { getNewOrder } from '@lib/utils/order/getNewOrder'
import { sortEntitiesWithOrder } from '@lib/utils/entities/EntityWithOrder'
import { Wrap } from '@lib/ui/base/Wrap'
import { getTaskChecklistItemInitialValue } from './getTaskChecklistItemInitialValue'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { checklistConfig } from './config'
import { FormSectionShyTitle } from '@lib/ui/form/components/FormSectionShyTitle'
import { AddChecklistItem } from './AddChecklistItem'

type TaskChecklistInputProps = InputProps<TaskChecklistItem[]>

const Container = styled(VStack)`
  gap: 8px;
  overflow-y: auto;
`

const DragHandle = styled(ChecklistItemDragHandle)``

const DraggableItemContainer = styled(HStack)<DraggingAwareComponentProps>`
  width: 100%;
  gap: ${toSizeUnit(checklistConfig.dragHandleContentGap)};
  ${({ isDragging }) =>
    isDragging &&
    css`
      opacity: 0.4;
    `}

  &:hover ${DragHandle} {
    opacity: 1;
  }
`

const Content = styled.div`
  padding-left: ${toSizeUnit(
    checklistConfig.dragHandleWidth + checklistConfig.dragHandleContentGap,
  )};
`

export const TaskChecklistInput = ({
  value,
  onChange,
}: TaskChecklistInputProps) => {
  const items = sortEntitiesWithOrder(value)

  return (
    <Container>
      <Content>
        <FormSectionShyTitle>Sub-tasks</FormSectionShyTitle>
      </Content>
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
                  <DragHandle
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
                          ...getTaskChecklistItemInitialValue(),
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
      <AddChecklistItem
        onClick={() => {
          onChange([
            ...value,
            {
              ...getTaskChecklistItemInitialValue(),
              order: getLastItemOrder(value.map((value) => value.order)),
            },
          ])
        }}
      />
    </Container>
  )
}
