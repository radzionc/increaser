import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Panel } from '@lib/ui/panel/Panel'
import { HStack } from '@lib/ui/layout/Stack'
import { Button } from '@lib/ui/buttons/Button'
import { preventDefault } from '@lib/ui/utils/preventDefault'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { TaskNameInput } from '../../tasks/TaskNameInput'
import { TaskProjectSelector } from '../../tasks/TaskProjectSelector'
import { TaskLinksInput } from '../../tasks/form/TaskLinksInput'
import { useIsTaskFormDisabled } from '../../tasks/form/useIsTaskFormDisabled'
import { TaskFactoryFormShape } from './TaskFactoryFormShape'
import { useCurrentTaskFactory } from '../CurrentTaskFactoryProvider'
import { useUpdateTaskFactoryMutation } from '../api/useUpdateTaskFactoryMutation'
import { useDeleteTaskFactoryMutation } from '../api/useDeleteTaskFactoryMutation'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { fixLinks } from '../../tasks/form/fixLinks'
import { TaskCadenceInput } from './TaskCadenceInput'

export const EditTaskFactoryForm = () => {
  const taskFactory = useCurrentTaskFactory()
  const [value, setValue] = useState<TaskFactoryFormShape>({
    name: taskFactory.task.name,
    projectId: taskFactory.task.projectId,
    links: taskFactory.task.links ?? [],
    cadence: taskFactory.cadence,
  })
  const { mutate: updateTaskFactory } = useUpdateTaskFactoryMutation()
  const { mutate: deleteTaskFactory } = useDeleteTaskFactoryMutation()

  const [, setActiveItemId] = useActiveItemId()

  const onFinish = useCallback(() => {
    setActiveItemId(null)
  }, [setActiveItemId])

  useEffect(() => {
    return () => {
      onFinish()
    }
  }, [onFinish])

  const isDisabled = useIsTaskFormDisabled(value)

  const handleSubmit = () => {
    if (isDisabled) {
      return
    }

    const fields: Partial<Omit<TaskFactory, 'id'>> = {
      task: {
        name: value.name,
        projectId: value.projectId,
        links: fixLinks(value.links),
      },
      cadence: value.cadence,
    }

    updateTaskFactory({
      id: taskFactory.id,
      fields,
    })
    onFinish()
  }

  return (
    <Panel
      withSections
      kind="secondary"
      as="form"
      style={{ width: '100%' }}
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
      <HStack alignItems="center" gap={8}>
        <TaskProjectSelector
          value={value.projectId}
          onChange={(projectId) => setValue((prev) => ({ ...prev, projectId }))}
        />
        <TaskCadenceInput
          value={value.cadence}
          onChange={(cadence) => setValue((prev) => ({ ...prev, cadence }))}
        />
      </HStack>

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
            deleteTaskFactory({ id: taskFactory.id })
            onFinish()
          }}
        >
          Delete
        </Button>
        <HStack alignItems="center" gap={8}>
          <Button isDisabled={isDisabled} onClick={onFinish} kind="secondary">
            Cancel
          </Button>
          <Button>Save</Button>
        </HStack>
      </HStack>
    </Panel>
  )
}
