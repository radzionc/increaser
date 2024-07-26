import { useState } from 'react'
import { Task } from '@increaser/entities/Task'
import { HStack, VStack } from '@lib/ui/layout/Stack'
import { TaskProjectSelector } from '../TaskProjectSelector'
import { Button } from '@lib/ui/buttons/Button'
import { useCurrentTask } from '../CurrentTaskProvider'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'
import { TaskDeadlineInput } from '../TaskDeadlineInput'
import { useIsTaskFormDisabled } from './useIsTaskFormDisabled'
import { TaskFormShape } from './TaskFormShape'
import { TaskLinksInput } from './TaskLinksInput'
import { fixLinks } from './fixLinks'
import { fixChecklist } from './checklist/fixChecklist'
import { TaskChecklistInput } from './checklist/TaskChecklistInput'
import { FinishableComponentProps, UIComponentProps } from '@lib/ui/props'
import { Panel } from '@lib/ui/panel/Panel'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { EmojiTextInputFrame } from '../../form/EmojiTextInputFrame'
import { EmbeddedTitleInput } from '@lib/ui/inputs/EmbeddedTitleInput'
import { TaskDescriptionInput } from './TaskDescriptionInput'
import { pick } from '@lib/utils/record/pick'
import { getUpdatedValues } from '@lib/utils/record/getUpdatedValues'
import { useUpdateUserEntityMutation } from '../../userEntity/api/useUpdateUserEntityMutation'
import { useDeleteUserEntityMutation } from '../../userEntity/api/useDeleteUserEntityMutation'

type EditTaskFormContentProps = FinishableComponentProps & UIComponentProps

export const EditTaskFormContent = ({
  onFinish,
  ...rest
}: EditTaskFormContentProps) => {
  const { tasks } = useAssertUserState()
  const task = useCurrentTask()
  const initialValue = pick(task, [
    'name',
    'projectId',
    'links',
    'checklist',
    'description',
    'deadlineAt',
  ])
  const [value, setValue] = useState<TaskFormShape>(initialValue)

  const { mutate: updateTask } = useUpdateUserEntityMutation('task')
  const { mutate: deleteTask } = useDeleteUserEntityMutation('task')

  const isDisabled = useIsTaskFormDisabled(value)

  const onSubmit = () => {
    if (isDisabled) {
      return
    }

    const newFields: Partial<Omit<Task, 'id'>> = getUpdatedValues(
      initialValue,
      {
        ...value,
        links: fixLinks(value.links),
        checklist: fixChecklist(value.checklist),
      },
    )
    if (value.deadlineAt !== task.deadlineAt) {
      const orders = Object.values(tasks).map((task) => task.order)
      newFields.order = getLastItemOrder(orders)
    }

    updateTask({
      id: task.id,
      fields: newFields,
    })
    onFinish()
  }

  return (
    <Panel
      as="form"
      {...getFormProps({
        onClose: onFinish,
        isDisabled,
        onSubmit,
      })}
      withSections
      kind="secondary"
      {...rest}
    >
      <EmojiTextInputFrame>
        <div>
          <TaskProjectSelector
            value={value.projectId}
            onChange={(projectId) =>
              setValue((prev) => ({ ...prev, projectId }))
            }
          />
        </div>

        <EmbeddedTitleInput
          autoFocus
          placeholder="Task name"
          value={value.name}
          onChange={(name) => setValue((prev) => ({ ...prev, name }))}
          onSubmit={onSubmit}
        />
      </EmojiTextInputFrame>
      <TaskDescriptionInput
        value={value.description}
        onChange={(description) =>
          setValue((prev) => ({ ...prev, description }))
        }
      />
      <TaskLinksInput
        value={value.links}
        onChange={(links) => setValue((prev) => ({ ...prev, links }))}
      />
      <TaskChecklistInput
        value={value.checklist}
        onChange={(checklist) => setValue((prev) => ({ ...prev, checklist }))}
      />
      <VStack>
        <TaskDeadlineInput
          value={value.deadlineAt}
          onChange={(deadlineAt) =>
            setValue((prev) => ({ ...prev, deadlineAt }))
          }
        />
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
            deleteTask(task.id)
            onFinish()
          }}
        >
          Delete
        </Button>
        <HStack alignItems="center" gap={8}>
          <Button type="button" onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button isDisabled={isDisabled}>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
