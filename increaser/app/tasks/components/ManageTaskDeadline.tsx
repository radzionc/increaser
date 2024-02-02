import { useRhythmicRerender } from '@lib/ui/hooks/useRhythmicRerender'
import { useCurrentTask } from './CurrentTaskProvider'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getDeadlineType } from '@increaser/entities-utils/task/getDeadlineType'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { CalendarIcon } from '@lib/ui/icons/CalendarIcon'
import { MenuOption, MenuOptionProps } from '@lib/ui/menu/MenuOption'
import { DeadlineType, deadlineName } from '@increaser/entities/Task'
import { useUpdateUserMutation } from '../../user/mutations/useUpdateUserMutation'
import { getDeadlineAt } from '@increaser/entities-utils/task/getDeadlineAt'
import { Menu } from '@lib/ui/menu'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getDeadlineTypes } from '@increaser/entities-utils/task/getDeadlineTypes'

export const ManageTaskDeadline = () => {
  const { deadlineAt, id } = useCurrentTask()
  const { tasks } = useAssertUserState()

  const now = useRhythmicRerender(convertDuration(1, 'min', 'ms'))

  const deadlineType = getDeadlineType({
    deadlineAt: deadlineAt,
    now,
  })

  const { mutate: updateUser } = useUpdateUserMutation()

  const changeDeadline = (deadlineType: DeadlineType) => {
    const deadlineAt = getDeadlineAt({
      now: Date.now(),
      deadlineType,
    })

    updateUser({
      tasks: tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              deadlineAt,
            }
          : task,
      ),
    })
  }

  return (
    <Menu
      title="Change deadline"
      renderContent={({ view, onClose }) => {
        const options: MenuOptionProps[] = getDeadlineTypes(Date.now()).map(
          (deadlineType) => ({
            text: deadlineName[deadlineType],
            onSelect: () => {
              changeDeadline(deadlineType)
              onClose()
            },
          }),
        )

        return options.map(({ text, icon, onSelect, kind }) => (
          <MenuOption
            text={text}
            key={text}
            icon={icon}
            view={view}
            kind={kind}
            onSelect={() => {
              onClose()
              onSelect()
            }}
          />
        ))
      }}
      renderOpener={(props) => (
        <div {...props}>
          <IconButton
            title="Change deadline"
            kind="secondary"
            icon={<CalendarIcon />}
            onClick={() => {
              console.log('change deadline', deadlineType)
            }}
          />
        </div>
      )}
    />
  )
}
