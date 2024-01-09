import { useDeleteHabitMutation } from '@increaser/app/habits/api/useDeleteHabitMutation'
import { useUpdateHabitMutation } from '@increaser/app/habits/api/useUpdateHabitMutation'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { OpenMenuButton } from '@lib/ui/buttons/OpenMenuButton'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { RefreshIcon } from '@lib/ui/icons/RefreshIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { Menu } from '@lib/ui/menu'
import { MenuOption, MenuOptionProps } from '@lib/ui/menu/MenuOption'
import { MS_IN_SEC } from '@lib/utils/time'

interface ManageHabitProps {
  onEdit: () => void
}

export const ManageHabit = ({ onEdit }: ManageHabitProps) => {
  const habit = useCurrentHabit()
  const { id } = habit

  const { mutate: deleteHabit } = useDeleteHabitMutation()
  const { mutate: updateHabit } = useUpdateHabitMutation()

  return (
    <>
      <Menu
        title={habit.name}
        renderContent={({ view, onClose }) => {
          const options: MenuOptionProps[] = [
            {
              icon: <EditIcon />,
              text: 'Edit habit',
              onSelect: onEdit,
            },
            {
              icon: <RefreshIcon />,
              text: 'Reset habit',
              onSelect: () => {
                updateHabit({
                  id,
                  fields: {
                    startedAt: Math.round(Date.now() / MS_IN_SEC),
                    successes: [],
                  },
                })
              },
            },
            {
              icon: <TrashBinIcon />,
              text: 'Delete habit',
              kind: 'alert',
              onSelect: () => {
                deleteHabit({ id })
              },
            },
          ]

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
        renderOpener={(props) => <OpenMenuButton {...props} />}
      />
    </>
  )
}
