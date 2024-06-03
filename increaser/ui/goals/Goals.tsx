import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { VStack } from '@lib/ui/layout/Stack'
import { GoalItem } from './GoalItem'
import { CurrentGoalProvider } from './CurrentGoalProvider'
import { DnDList } from '../../../lib/dnd/DnDList'
import { useUpdateGoalMutation } from './api/useUpdateGoalMutation'
import { order } from '@lib/utils/array/order'
import { ListItemDragHandle } from '@lib/ui/dnd/ListItemDragHandle'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { DraggableItemContainer } from '@lib/ui/dnd/DraggableItemContainer'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { goalContentMinHeight, goalVerticalPadding } from './config'

const DragHandle = styled(ListItemDragHandle)`
  height: ${toSizeUnit(goalContentMinHeight + goalVerticalPadding * 2)};
`

export const Goals = () => {
  const { goals } = useAssertUserState()
  const items = order(Object.values(goals), (item) => item.order, 'asc')

  const [activeItemId] = useActiveItemId()

  const { mutate: updateGoal } = useUpdateGoalMutation()

  return (
    <DnDList
      items={items}
      getItemId={(item) => item.id}
      getItemOrder={(item) => item.order}
      onChange={(id, { order }) => {
        updateGoal({
          id,
          fields: {
            order,
          },
        })
      }}
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
            <CurrentGoalProvider key={item.id} value={item}>
              <GoalItem />
            </CurrentGoalProvider>
          </DraggableItemContainer>
        )
      }}
    />
  )
}
