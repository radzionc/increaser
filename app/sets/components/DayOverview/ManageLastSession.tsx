import { useStartOfDay } from '@increaser/ui/hooks/useStartOfDay'
import { useFocus } from 'focus/hooks/useFocus'
import { useDayOverview } from './DayOverviewProvider'
import styled, { useTheme } from 'styled-components'
import { horizontalPaddingInPx } from './config'
import { getLastItem } from '@increaser/utils/array/getLastItem'
import { toPercents } from '@increaser/utils/toPercents'
import { useProjects } from 'projects/hooks/useProjects'
import { getProjectColor } from 'projects/utils/getProjectColor'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { getProjectEmoji } from 'projects/utils/getProjectEmoji'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import { interactive } from '@increaser/ui/css/interactive'
import { MoreHorizontalIcon } from '@increaser/ui/ui/icons/MoreHorizontalIcon'
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

const offsetInPx = 4

const Container = styled.div`
  ${interactive}
  position: absolute;
  right: ${horizontalPaddingInPx}px;
  border-radius: 8px;
  padding: 4px 8px;
  ${centerContentCSS};
  font-size: 14px;
  border: 2px solid;
  background: ${getColor('background')};
  color: ${getColor('text')};
  ${defaultTransitionCSS};
  :hover {
    color: ${getColor('contrast')};
  }
`

type MenuOptionType = 'editInterval' | 'changeProject'

export const ManageLastSession = () => {
  const [selectedOption, setSelectedOption] = useState<MenuOptionType | null>(
    null,
  )

  const { currentSet } = useFocus()
  const todayStartedAt = useStartOfDay()
  const { dayStartedAt, sets, timelineEndsAt, timelineStartsAt } =
    useDayOverview()

  const theme = useTheme()
  const { projectsRecord } = useProjects()

  const { mutate: deleteLastSet } = useDeleteLastSetMutation()

  if (currentSet || dayStartedAt !== todayStartedAt || !sets.length) {
    return null
  }

  const timespan = timelineEndsAt - timelineStartsAt
  const { end, projectId, start } = getLastItem(sets)
  const color = getProjectColor(projectsRecord, theme, projectId)

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
        renderOpener={(props) => (
          <Container
            {...props}
            style={{
              top: `calc(${toPercents(
                (end - timelineStartsAt) / timespan,
              )} + ${offsetInPx}px)`,
              borderColor: color.toCssValue(),
            }}
          >
            <HStack alignItems="center" gap={8}>
              <Text size={14}>
                {getProjectEmoji(projectsRecord, projectId)}
              </Text>
              <Text size={14} weight="semibold">
                {formatDuration(end - start, 'ms')}
              </Text>
              <MoreHorizontalIcon />
            </HStack>
          </Container>
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
