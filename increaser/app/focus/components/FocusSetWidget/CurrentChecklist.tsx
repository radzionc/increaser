import { useCurrentTask } from '@increaser/ui/tasks/CurrentTaskProvider'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { ChecklistItem } from '@lib/ui/checklist/ChecklistItem'
import { VStack } from '@lib/ui/layout/Stack'
import { order } from '@lib/utils/array/order'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const CurrentChecklist = () => {
  const task = useCurrentTask()

  const items = order(
    shouldBePresent(task.checklist),
    (item) => item.order,
    'asc',
  )

  const { mutate } = useUpdateTaskMutation()

  return (
    <VStack>
      {items.map(({ completed, name, id }) => (
        <ChecklistItem
          key={id}
          shouldCrossOut
          name={name}
          value={completed}
          onChange={() => {
            mutate({
              id: task.id,
              fields: {
                checklist: items.map((item) =>
                  item.name === name
                    ? { ...item, completed: !item.completed }
                    : item,
                ),
              },
            })
          }}
        />
      ))}
    </VStack>
  )
}
