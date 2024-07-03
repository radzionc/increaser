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
import { TaskCadence } from './TaskCadence'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { useAssertUserState } from '../user/UserStateContext'

const Outline = styled(TakeWholeSpace)`
  ${absoluteOutline(8, 0)};
  ${borderRadius.s};
  pointer-events: none;
`

const Content = styled(VStack)`
  position: relative;
  width: 100%;
  ${interactive};

  &:hover ${Outline} {
    background: ${getColor('mist')};
  }
`

export const TaskFactoryItem = () => {
  const { id, task } = useCurrentTaskFactory()

  const { projects } = useAssertUserState()

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
        <PrefixedItemFrame>
          <Text size={16} color="contrast">
            {projects[task.projectId].emoji}
          </Text>
          {task.name}
        </PrefixedItemFrame>
        <TaskCadence />
      </HStack>
      <Outline />
    </Content>
  )
}
