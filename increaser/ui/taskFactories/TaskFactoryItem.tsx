import styled from 'styled-components'

import { interactive } from '@lib/ui/css/interactive'

import { getColor } from '@lib/ui/theme/getters'
import { TakeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { useCurrentTaskFactory } from './CurrentTaskFactoryProvider'
import { EditTaskFactoryForm } from './form/EditTaskFactoryForm'
import { TaskTextContainer } from '../tasks/TaskTextContainer'
import { TaskProject } from '../tasks/TaskProject'
import { TaskCadence } from './TaskCadence'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { taskFactoryConfig } from './config'

const Outline = styled(TakeWholeSpace)`
  ${absoluteOutline(8, 0)};
  ${borderRadius.s};
  pointer-events: none;
`

const Content = styled(VStack)`
  position: relative;
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
    <Content
      onClick={() => {
        setActiveItemId(id)
      }}
    >
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
      <Outline />
    </Content>
  )
}
