import { useProjects } from 'projects/hooks/useProjects'
import { getProjectEmoji } from 'projects/utils/getProjectEmoji'
import { useState } from 'react'
import { getSetDuration } from 'sets/helpers/getSetDuration'
import { useDeleteLastSetMutation } from 'sets/hooks/useDeleteLastSetMutation'
import { Set } from 'sets/Set'
import { formatDuration } from '@increaser/utils/time/formatDuration'
import styled from 'styled-components'
import { defaultTransitionCSS } from '@increaser/ui/ui/animations/transitions'
import { HSLA } from '@increaser/ui/ui/colors/HSLA'
import { EditIcon } from '@increaser/ui/ui/icons/EditIcon'
import { MoreHorizontalIcon } from '@increaser/ui/ui/icons/MoreHorizontalIcon'
import { MoveIcon } from '@increaser/ui/ui/icons/MoveIcon'
import { TrashBinIcon } from '@increaser/ui/ui/icons/TrashBinIcon'
import { Menu } from '@increaser/ui/ui/Menu'
import { MenuOption, MenuOptionProps } from '@increaser/ui/ui/Menu/MenuOption'
import { HStack, VStack } from '@increaser/ui/ui/Stack'
import { Text } from '@increaser/ui/ui/Text'
import { EmojiTextPrefix } from 'ui/EmojiTextPrefix'
import { centerContentCSS } from '@increaser/ui/ui/utils/centerContentCSS'
import { getSameDimensionsCSS } from '@increaser/ui/ui/utils/getSameDimensionsCSS'

import { ChangeLastSetIntervalOverlay } from './ChangeLastSetInvervalOverlay'
import { ChangeLastSetProjectOverlay } from './ChangeLastSetProjectOverlay'
import { SessionProjectIdentifier, TimelineSession } from './TimelineSession'
import { Match } from '@increaser/ui/ui/Match'
import { getColor } from '@increaser/ui/ui/theme/getters'
import { interactiveCSS } from '@increaser/ui/ui/utils/interactiveCSS'

interface Props {
  style: React.CSSProperties
  color: HSLA
  className?: string
  set: Set
}

const Wrapper = styled.div<{ $color: HSLA }>`
  position: absolute;
  right: -2px;
  bottom: -38px;
  border-radius: 8px;
  overflow: hidden;
  background: ${getColor('background')};
  border: 2px solid ${(props) => props.$color.toCssValue()};
`

const SessionDetails = styled(HStack)`
  padding: 4px;
  padding-left: 8px;
  ${interactiveCSS};
  z-index: 1;
  background: ${getColor('mist')};

  color: ${getColor('textSupporting')};
`

const MoreButton = styled.div`
  ${centerContentCSS};
  ${getSameDimensionsCSS(20)}
  ${defaultTransitionCSS};

  font-size: 14px;
`

const Duration = styled(Text)`
  ${defaultTransitionCSS};
  font-size: 14px;
  font-weight: 500;
`

const Session = styled(TimelineSession)<{ $color: HSLA }>`
  background: ${getColor('mist')};

  :hover ${SessionDetails} {
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }

  :hover ${MoreButton} {
    color: ${getColor('contrast')};
  }
`

type MenuOptionType = 'editInterval' | 'changeProject'

export const ManageLastSet = ({ style, color, className, set }: Props) => {
  const [selectedOption, setSelectedOption] = useState<MenuOptionType | null>(
    null,
  )

  const { mutate: deleteLastSet } = useDeleteLastSetMutation()

  const { projectsRecord } = useProjects()

  return (
    <>
      <Menu
        title="Manage last set"
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
          <Session
            $color={color}
            style={{
              ...style,
              cursor: 'pointer',
            }}
            {...props}
            className={className}
          >
            <VStack fullWidth fullHeight style={{ position: 'relative' }}>
              <SessionProjectIdentifier $color={color} />
              <Wrapper $color={color}>
                <SessionDetails gap={8}>
                  <Duration>
                    <EmojiTextPrefix
                      emoji={getProjectEmoji(projectsRecord, set.projectId)}
                    />
                    {formatDuration(getSetDuration(set), 'ms')}
                  </Duration>
                  <MoreButton>
                    <MoreHorizontalIcon />
                  </MoreButton>
                </SessionDetails>
              </Wrapper>
            </VStack>
          </Session>
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
