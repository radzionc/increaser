import { OpenMenuButton } from '@increaser/ui/buttons/OpenMenuButton'
import { EditIcon } from '@increaser/ui/icons/EditIcon'
import { RefreshIcon } from '@increaser/ui/icons/RefreshIcon'
import { TrashBinIcon } from '@increaser/ui/icons/TrashBinIcon'
import { Menu } from '@increaser/ui/menu'
import { MenuOption, MenuOptionProps } from '@increaser/ui/menu/MenuOption'

import { useCurrentHabit } from '../CurrentHabitProvider'

interface ManageHabitProps {
  onEdit: () => void
}

export const ManageHabit = ({ onEdit }: ManageHabitProps) => {
  const habit = useCurrentHabit()

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
              onSelect: () => {},
            },
            {
              icon: <TrashBinIcon />,
              text: 'Delete habit',
              kind: 'alert',
              onSelect: () => {},
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
