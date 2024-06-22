import styled from 'styled-components'

import { ActionInsideInteractiveElement } from '@lib/ui/base/ActionInsideInteractiveElement'
import { Spacer } from '@lib/ui/layout/Spacer'
import { interactive } from '@lib/ui/css/interactive'
import {
  checklistItemContentMinHeight,
  checklistItemGap,
  checklistItemVerticalPadding,
} from '@lib/ui/checklist/ChecklistItemFrame'
import { getColor } from '@lib/ui/theme/getters'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { EditTaskFactoryForm } from './form/EditTaskFactoryForm'
import { TaskLinks } from '../tasks/TaskLinks'
import { TaskTextContainer } from '../tasks/TaskTextContainer'
import { TaskProject } from '../tasks/TaskProject'
import { TaskCadence } from './TaskCadence'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { taskFactoryConfig } from './config'

const Container = styled(ActionInsideInteractiveElement)`
  width: 100%;
`

const Outline = styled(TakeWholeSpace)`
  ${absoluteOutline(8, 0)};
  ${borderRadius.s};
  pointer-events: none;
`

const Content = styled(VStack)`
  ${interactive};
  ${verticalPadding(taskFactoryConfig.verticalPadding)};

  &:hover ${Outline} {
    background: ${getColor('mist')};
  }
`

export const TaskFactoryItem = () => {
  const { id, task } = useCurrentTaskFactory()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditTaskFactoryForm />
  }

  return (
    <Container
      render={({ actionSize: linksSize }) => (
        <Content
          onClick={() => {
            setActiveItemId(id)
          }}
        >
          <VStack gap={4}>
            <HStack
              fullWidth
              alignItems="center"
              justifyContent="spac-between"
              gap={20}
            >
              <TaskTextContainer>
                <TaskProject value={task.projectId} />
                {task.name}
              </TaskTextContainer>
              <TaskCadence />
            </HStack>
            {task.links && task.links.length > 0 && <Spacer {...linksSize} />}
          </VStack>
          <Outline />
        </Content>
      )}
      action={task.links && <TaskLinks value={task.links} />}
      actionPlacerStyles={{
        left: checklistItemContentMinHeight + checklistItemGap,
        bottom: checklistItemVerticalPadding,
      }}
    />
  )
}
