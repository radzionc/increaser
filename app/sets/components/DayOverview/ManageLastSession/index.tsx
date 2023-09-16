import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { useFocus } from 'focus/hooks/useFocus'
import { useDayOverview } from '../DayOverviewProvider'
import { getLastItem } from '@increaser/utils/array/getLastItem'
import { Menu } from '@increaser/ui/ui/Menu'
import { MenuOptionProps, MenuOption } from '@increaser/ui/ui/Menu/MenuOption'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { MoveIcon } from '@increaser/ui/ui/icons/MoveIcon'
import { TrashBinIcon } from '@increaser/ui/ui/icons/TrashBinIcon'
import { useState } from 'react'
import { Match } from '@increaser/ui/ui/Match'
import { ChangeLastSetIntervalOverlay } from 'focus/components/ChangeLastSetInvervalOverlay'
import { ChangeLastSetProjectOverlay } from 'focus/components/ChangeLastSetProjectOverlay'
import { useDeleteLastSetMutation } from 'sets/hooks/useDeleteLastSetMutation'
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
