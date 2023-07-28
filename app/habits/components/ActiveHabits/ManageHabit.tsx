import { useDeleteHabitMutation } from 'habits/api/useDeleteHabitMutation'
import { useUpdateHabitMutation } from 'habits/api/useUpdateHabitMutation'
import { OpenMenuButton } from '@increaser/ui/ui/buttons/OpenMenuButton'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { RefreshIcon } from '@increaser/ui/ui/icons/RefreshIcon'
import { TrashBinIcon } from '@increaser/ui/ui/icons/TrashBinIcon'
import { Menu } from '@increaser/ui/ui/Menu'
import { MenuOption, MenuOptionProps } from '@increaser/ui/ui/Menu/MenuOption'
import { MS_IN_SEC } from 'utils/time'

import { useCurrentHabit } from '../CurrentHabitProvider'

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
                  startedAt: Math.round(Date.now() / MS_IN_SEC),
                  successes: [],
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
        renderOpener={(props) => (
          <OpenMenuButton title="Manage habit" {...props} />
        )}
      />
    </>
  )
}
