import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { CreateTaskForm } from '../form/CreateTaskForm'
import { useProjectFilter } from '../../projects/filter/ProjectFilterProvider'
import { useMemo } from 'react'
import { TaskFormShape } from '../form/TaskFormShape'
import { HStack } from '@lib/ui/layout/Stack'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { useTaskStatusFilter } from '../status/TaskStatusFilter'

export const AddTask = () => {
  const [projectId] = useProjectFilter()
  const [status] = useTaskStatusFilter()

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
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Button size="s" onClick={onOpen}>
            <HStack alignItems="center" gap={8}>
              <IconWrapper>
                <PlusIcon />
              </IconWrapper>
              Add a task
            </HStack>
          </Button>
        )
      }
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateTaskForm defaultValue={defaultValue} onFinish={onClose} />
        </PanelModal>
      )}
    />
  )
}
