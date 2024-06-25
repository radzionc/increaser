import { FormEvent, useState } from 'react'
import { DeadlineStatus, Task } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { TaskNameInput } from '../TaskNameInput'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentTask } from '../CurrentTaskProvider'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { groupItems } from '@lib/utils/array/groupItems'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { TaskDeadlineInput } from '../TaskDeadlineInput'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { useDeleteTaskMutation } from '../api/useDeleteTaskMutation'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskFormShape } from './TaskFormShape'
import { TaskLinksInput } from './TaskLinksInput'
import { fixLinks } from './fixLinks'
import { fixChecklist } from './checklist/fixChecklist'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { FinishableComponentProps } from '@lib/ui/props'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import { modalConfig } from '@lib/ui/modal/config'
import { BodyPortal } from '@lib/ui/dom/BodyPortal'
import { CompleteMist } from '@lib/ui/modal/CompleteMist'
import { FocusTrap } from '@lib/ui/modal/FocusTrap'
import { useKey } from 'react-use'
import styled from 'styled-components'
import { ModalContainer } from '@lib/ui/modal/ModalContainer'
import { stopPropagation } from '@lib/ui/utils/stopPropagation'

const prefferedWidth = 560

const Container = styled(ModalContainer)`
  overflow: hidden;
`

export const EditTaskFormOverlay = ({ onFinish }: FinishableComponentProps) => {
  const { tasks } = useAssertUserState()
  const task = useCurrentTask()
  const [value, setValue] = useState<TaskFormShape>({
    name: task.name,
    projectId: task.projectId,
    links: task.links ?? [],
    checklist: task.checklist ?? [],
  })
  const currentDeadlineStatus = getDeadlineStatus({
    now: Date.now(),
    deadlineAt: task.deadlineAt,
  })
  const [deadlineStatus, setDeadlineStatus] = useState<DeadlineStatus>(
    currentDeadlineStatus,
  )

  const { mutate: updateTask } = useUpdateTaskMutation()
  const { mutate: deleteTask } = useDeleteTaskMutation()

  const isDisabled = useIsTaskFormDisabled(value)

  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<Task, 'id'>> = {}
    if (value.name !== task.name) {
      fields.name = value.name
    }
    if (value.projectId !== task.projectId) {
      fields.projectId = value.projectId
    }
    const newLinks = fixLinks(value.links)
    if (newLinks !== task.links) {
      fields.links = newLinks
    }

    const newChecklist = fixChecklist(value.checklist)
    if (newChecklist !== task.checklist) {
      fields.checklist = newChecklist
    }

    if (
      deadlineStatus !== currentDeadlineStatus &&
      deadlineStatus !== 'overdue'
    ) {
      const now = Date.now()

      const deadlineAt = getDeadlineAt({
        now,
        deadlineType: deadlineStatus,
      })

      const groupedTasks = groupItems(
        Object.values(tasks).filter((task) => !task.completedAt),
        (task) =>
          getDeadlineStatus({
            deadlineAt: task.deadlineAt,
            now,
          }),
      )

      fields.deadlineAt = deadlineAt
      fields.order = getLastItemOrder(
        (groupedTasks[deadlineStatus] ?? []).map((task) => task.order),
      )
    }

    updateTask({
      id: task.id,
      fields,
    })
    onFinish()
  }

  useKey('Escape', onFinish)
  const isFullScreen = useIsScreenWidthLessThan(
    prefferedWidth + modalConfig.minHorizontalFreeSpaceForMist,
  )

  return (
    <BodyPortal>
      <CompleteMist onClick={onFinish}>
        <FocusTrap>
          <Container
            onClick={stopPropagation()}
            placement="top"
            width={isFullScreen ? undefined : prefferedWidth}
            as="form"
            onSubmit={preventDefault<FormEvent<HTMLFormElement>>(() =>
              handleSubmit(),
            )}
          >
            <TaskNameInput
              placeholder="Task name"
              autoFocus
              onChange={(name) => setValue((prev) => ({ ...prev, name }))}
              value={value.name}
              onSubmit={handleSubmit}
            />
            <TaskLinksInput
              value={value.links}
              onChange={(links) => setValue((prev) => ({ ...prev, links }))}
            />
            <TaskChecklistInput
              value={value.checklist}
              onChange={(checklist) =>
                setValue((prev) => ({ ...prev, checklist }))
              }
            />
            <VStack gap={28}>
              <HStack alignItems="center" gap={8}>
                <TaskProjectSelector
                  value={value.projectId}
                  onChange={(projectId) =>
                    setValue((prev) => ({ ...prev, projectId }))
                  }
                />
                <TaskDeadlineInput
                  value={deadlineStatus}
                  onChange={setDeadlineStatus}
                />
              </HStack>
            </VStack>

            <HStack
              wrap="wrap"
              justifyContent="space-between"
              fullWidth
              alignItems="center"
              gap={20}
            >
              <Button
                kind="alert"
                type="button"
                onClick={() => {
                  deleteTask({ id: task.id })
                  onFinish()
                }}
              >
                Delete
              </Button>
              <HStack alignItems="center" gap={8}>
                <Button
                  isDisabled={isDisabled}
                  onClick={onFinish}
                  kind="secondary"
                >
                  Cancel
                </Button>
                <Button>Save</Button>
              </HStack>
            </HStack>
          </Container>
        </FocusTrap>
      </CompleteMist>
    </BodyPortal>
  )
}
