import { IconButton } from '@lib/ui/buttons/IconButton'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { useUpdateUserMutation } from '@increaser/app/user/mutations/useUpdateUserMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'

import { useCurrentTask } from './CurrentTaskProvider'
import { HStack } from '@lib/ui/layout/Stack'
import { ManageTaskDeadline } from './ManageTaskDeadline'
import styled from 'styled-components'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { CheckStatus } from '@lib/ui/checklist/CheckStatus'
import { Text } from '@lib/ui/text'
import { InvisibleHTMLCheckbox } from '@lib/ui/inputs/InvisibleHTMLCheckbox'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { getColor } from '@lib/ui/theme/getters'
import { cropText } from '@lib/ui/css/cropText'

const Actions = styled(HStack)`
  gap: 4px;
  align-items: center;
  opacity: 1;

  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
  }
`

const Container = styled(HStack)`
  width: 100%;
  align-items: center;
  gap: 8px;

  &:hover ${Actions} {
    opacity: 1;
  }
`

const Check = styled(CheckStatus)``

const Content = styled(ChecklistItemFrame)`
  ${interactive};
  ${transition};
  overflow: hidden;

  &:hover {
    color: ${getColor('contrast')};
  }

  &:hover ${Check} {
    border-color: ${getColor('contrast')};
  }
`

const TaskName = styled(Text)`
  ${cropText};
  width: 100%;
`

export const TaskItem = () => {
  const task = useCurrentTask()
  const { id, name, completedAt } = task

  const { tasks } = useAssertUserState()
  const { mutate } = useUpdateUserMutation()

  const value = !!completedAt

  return (
    <Container>
      <Content as="label">
        <Check value={value} />
        <TaskName>{name}</TaskName>
        <InvisibleHTMLCheckbox
          value={value}
          onChange={() => {
            mutate({
              tasks: tasks.map((task) => {
                if (task.id === id) {
                  return {
                    ...task,
                    completedAt: task.completedAt ? undefined : Date.now(),
                  }
                }
                return task
              }),
            })
          }}
        />
      </Content>
      <Actions>
        <ManageTaskDeadline />
        <IconButton
          kind="alert"
          title="Delete task"
          icon={<TrashBinIcon />}
          onClick={() => {
            mutate({
              tasks: tasks.filter((task) => task.id !== id),
            })
          }}
        />
      </Actions>
    </Container>
  )
}
