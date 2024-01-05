import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useDayOverview } from '../DayOverviewProvider'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { Menu } from '@lib/ui/menu'
import { MenuOptionProps, MenuOption } from '@lib/ui/menu/MenuOption'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { MoveIcon } from '@lib/ui/icons/MoveIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { useState } from 'react'
import { Match } from '@lib/ui/base/Match'
import { ChangeLastSetIntervalOverlay } from '@increaser/app/focus/components/ChangeLastSetInvervalOverlay'
import { ChangeLastSetProjectOverlay } from '@increaser/app/focus/components/ChangeLastSetProjectOverlay'
import { useDeleteLastSetMutation } from '@increaser/app/sets/hooks/useDeleteLastSetMutation'
import { ManageSetOpener } from './ManageSetOpener'

type MenuOptionType = 'editInterval' | 'changeProject'

export const ManageLastSession = () => {
  const [selectedOption, setSelectedOption] = useState<MenuOptionType | null>(
    null,
  )

  const { currentSet } = useFocus()
  const todayStartedAt = useStartOfDay()
  const { dayStartedAt, sets } = useDayOverview()

  const { mutate: deleteLastSet } = useDeleteLastSetMutation()

  if (currentSet || dayStartedAt !== todayStartedAt || !sets.length) {
    return null
  }

  return (
    <>
      <Menu
        title="Manage last session"
        renderContent={({ view, onClose }) => {
          const options: MenuOptionProps[] = [
            {
              icon: <EditIcon />,
              text: 'Change project',
              onSelect: () => {
                setSelectedOption('changeProject')
              },
            },
            {
              icon: <MoveIcon />,
              text: 'Edit interval',
              onSelect: () => {
                setSelectedOption('editInterval')
              },
            },
            {
              icon: <TrashBinIcon />,
              text: 'Delete session',
              kind: 'alert',
              onSelect: () => {
                deleteLastSet()
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
        renderOpener={(openerProps) => (
          <ManageSetOpener set={getLastItem(sets)} openerProps={openerProps} />
        )}
      />
      {selectedOption && (
        <Match
          value={selectedOption}
          editInterval={() => (
            <ChangeLastSetIntervalOverlay
              onClose={() => setSelectedOption(null)}
            />
          )}
          changeProject={() => (
            <ChangeLastSetProjectOverlay
              onClose={() => setSelectedOption(null)}
            />
          )}
        />
      )}
    </>
  )
}
