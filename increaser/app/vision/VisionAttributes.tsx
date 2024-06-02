import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { VisionAttributeItem } from './VisionAttributeItem'
import { CurrentVisionAttributeProvider } from './CurrentVisionAttributeProvider'
import { DnDList, ItemChangeParams } from './DnDList'
import { useUpdateVisionAttributeMutation } from './api/useUpdateVisionAttributeMutation'
import { useCallback } from 'react'
import { order } from '@lib/utils/array/order'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { visionItemContentMinHeight, visionItemVerticalPadding } from './config'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'

const DragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(
    visionItemContentMinHeight + visionItemVerticalPadding * 2,
  )};
`

export const VisionAttributes = () => {
  const { vision } = useAssertUserState()
  const items = order(Object.values(vision), (item) => item.order, 'asc')

  const [activeItemId] = useActiveItemId()

  const { mutate: updateVisionAttribute } = useUpdateVisionAttributeMutation()

  const onChange = useCallback(
    (id: string, { order }: ItemChangeParams) => {
      updateVisionAttribute({
        id,
        fields: {
          order,
        },
      })
    },
    [updateVisionAttribute],
  )

  return (
    <DnDList
      items={items}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={onChange}
      renderList={({ content, containerProps }) => (
        <VStack {...containerProps}>{content}</VStack>
      )}
      renderItem={({
        item,
        draggableProps,
        dragHandleProps,
        isDragging,
        isDraggingEnabled,
      }) => {
        const isEnabled = isDraggingEnabled && !activeItemId

        return (
          <DraggableItemContainer
            isActive={isDragging ?? false}
            {...draggableProps}
          >
            <DragHandle
              isEnabled={isEnabled}
              isActive={isDragging ?? false}
              {...dragHandleProps}
            />
            <CurrentVisionAttributeProvider key={item.id} value={item}>
              <VisionAttributeItem />
            </CurrentVisionAttributeProvider>
          </DraggableItemContainer>
        )
      }}
    />
  )
}
