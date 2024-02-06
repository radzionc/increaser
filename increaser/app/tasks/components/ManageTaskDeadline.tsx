import { useCurrentTask } from './CurrentTaskProvider'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { DeadlineType, deadlineName } from '@increaser/entities/Task'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'
import { useUpdateTaskMutation } from '../api/useUpdateTaskMutation'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { Text } from '@lib/ui/text'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import styled from 'styled-components'
import { getDeadlineStatus } from '@increaser/entities-utils/task/getDeadlineStatus'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { groupItems } from '@lib/utils/array/groupItems'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { getLastItemOrder } from '@lib/utils/order/getLastItemOrder'

const IconContainer = styled(IconWrapper)`
  font-size: 18px;
  width: 18px;
`

export const ManageTaskDeadline = () => {
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

    let order = 0
    const groupTasks = groupedTasks[deadlineType] ?? []
    if (groupTasks && !isEmpty(groupTasks)) {
      order = getLastItem(groupTasks).order - 1
      console.log({ groupTasks, order })
    }

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
    <ExpandableSelector
      openerContent={
        <IconContainer>
          <CalendarIcon />
        </IconContainer>
      }
      floatingOptionsWidthSameAsOpener={false}
      style={{ height: '100%', padding: 8 }}
      value={value}
      onChange={changeDeadline}
      options={getDeadlineTypes(now)}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <Text key={option}>{deadlineName[option]}</Text>
      )}
    />
  )
}
