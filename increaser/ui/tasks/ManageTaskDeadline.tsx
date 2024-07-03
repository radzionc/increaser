import { useCurrentTask } from './CurrentTaskProvider'
import { DeadlineStatus, DeadlineType } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { useUpdateTaskMutation } from '@increaser/ui/tasks/api/useUpdateTaskMutation'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { groupItems } from '@lib/utils/array/groupItems'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

type RenderParams = {
  value: Omit<DeadlineStatus, 'overdue'> | null
  onChange: (value: DeadlineType) => void
  options: readonly DeadlineType[]
}

type ManageTaskDeadlineProps = {
  render: (params: RenderParams) => React.ReactNode
}

export const ManageTaskDeadline = ({ render }: ManageTaskDeadlineProps) => {
  const { tasks } = useAssertUserState()
  const { id, deadlineAt } = useCurrentTask()

  const { mutate } = useUpdateTaskMutation()

  const now = useRhythmicRerender(1000)
  const deadlineStatus = getDeadlineStatus({
    now,
    deadlineAt,
  })
  const value = deadlineStatus === 'overdue' ? null : deadlineStatus

  const changeDeadline = (deadlineType: DeadlineType) => {
    const deadlineAt = getDeadlineAt({
      now: Date.now(),
      deadlineType,
    })

    const groupedTasks = groupItems(
      Object.values(tasks).filter((task) => !task.completedAt),
      (task) =>
        getDeadlineStatus({
          deadlineAt: task.deadlineAt,
          now,
        }),
    )

    mutate({
      id,
      fields: {
        deadlineAt,
        order: getLastItemOrder(
          (groupedTasks[deadlineType] ?? []).map((task) => task.order),
        ),
      },
    })
  }

  return (
    <>
      {render({
        value,
        onChange: changeDeadline,
        options: getDeadlineTypes(now),
      })}
    </>
  )
}
