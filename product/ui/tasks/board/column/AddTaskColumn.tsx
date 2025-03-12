import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { TaskStatus } from '@product/entities/Task'
import { useMemo } from 'react'
import styled from 'styled-components'

import { useProjectFilter } from '../../../projects/filter/project/state/projectFilter'
import { CreateTaskForm } from '../../form/CreateTaskForm'
import { TaskFormShape } from '../../form/TaskFormShape'
import { taskBoardConfig } from '../config'

type AddTaskProps = {
  status: TaskStatus
}

const Container = styled(Button)`
  justify-content: start;
  ${horizontalPadding(taskBoardConfig.itemHorizontalPadding)};
  outline: none;
`

export const AddTaskColumn = ({ status }: AddTaskProps) => {
  const [projectId] = useProjectFilter()

  const defaultValue = useMemo(() => {
    const result: Partial<TaskFormShape> = {
      status,
    }

    if (projectId) {
      result.projectId = projectId
    }
    return result
  }, [projectId, status])

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Container kind="ghost" size="s" onClick={onOpen}>
          <HStack alignItems="center" gap={8}>
            <IconWrapper>
              <PlusIcon />
            </IconWrapper>
            Add a task
          </HStack>
        </Container>
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskForm initialValue={defaultValue} onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
