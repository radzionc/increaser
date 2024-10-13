import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useMemo } from 'react'
import { HStack } from '@lib/ui/css/stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { TaskStatus } from '@increaser/entities/Task'
import { TaskFormShape } from '../../form/TaskFormShape'
import { CreateTaskForm } from '../../form/CreateTaskForm'
import styled from 'styled-components'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { taskBoardConfig } from '../config'
import { useProjectFilter } from '../../../projects/filter/project/state/projectFilter'

type AddTaskProps = {
  status: TaskStatus
}

const Container = styled(Button)`
  justify-content: start;
  ${horizontalPadding(taskBoardConfig.itemHorizontalPadding)};
  outline: none;
`

export const AddTask = ({ status }: AddTaskProps) => {
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
          <CreateTaskForm defaultValue={defaultValue} onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
