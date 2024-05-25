import styled, { useTheme } from 'styled-components'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { Center } from '@lib/ui/layout/Center'
import { HSLA } from '@lib/ui/colors/HSLA'
import { PauseIcon } from '@lib/ui/icons/PauseIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { StarIcon } from '@lib/ui/icons/StarIcon'
import { UniformColumnGrid } from '@lib/ui/Layout/UniformColumnGrid'
import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { Opener } from '@lib/ui/base/Opener'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import { centerContent } from '@lib/ui/css/centerContent'

import { FocusSound } from '@increaser/entities/FocusSound'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useUpdateUserMutation } from '@increaser/ui/user/mutations/useUpdateUserMutation'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { EditSoundForm } from './musicForm/EditSoundForm'

const PlayIndicator = styled.div<{ isActive: boolean }>`
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  position: absolute;

  font-size: 20px;
  display: flex;
  color: ${({ theme }) => theme.colors.text.toCssValue()};
`

const SoundNumber = styled(Text)``

const Identifier = styled.div`
  width: 100%;
  height: 100%;
  ${centerContent};
  position: relative;
`

const Container = styled(UnstyledButton)`
  font-size: 14px;
  font-weight: 500;
  padding: 4px ${toSizeUnit(panelDefaultPadding)};
  width: 100%;
  display: grid;
  grid-template-columns: minmax(24px, auto) 1fr auto;
  align-items: center;
  gap: 8px;
  justify-items: start;
  color: ${({ theme }) => theme.colors.textSupporting.toCssValue()};

  &:hover {
    background: ${({ theme }) => theme.colors.mist.toCssValue()};
    color: ${({ theme }) => theme.colors.text.toCssValue()};
  }

  &:hover ${PlayIndicator} {
    opacity: 1;
  }
  &:hover ${SoundNumber} {
    opacity: 0;
  }
`

interface SoundItemProps extends FocusSound {
  index: number
}

const Star = styled(StarIcon)<{ $color: HSLA }>`
  font-size: 16px;
  color: ${({ $color }) => $color.toCssValue()};
`

export const SoundItem = ({ name, url, favourite, index }: SoundItemProps) => {
  const [{ url: activeSoundUrl }, setPreference] = useYouTubeFocusPreference()
  const { focusSounds } = useAssertUserState()
  const { setState, isPlaying } = useYouTubeFocusMusic()
  const { mutate: updateUser } = useUpdateUserMutation()

  const isActive = activeSoundUrl === url

  const { colors } = useTheme()

  const star = <Star $color={favourite ? colors.idle : colors.textSupporting} />

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <OnHoverAction
            style={{ width: '100%' }}
            actionPlacerStyles={{ right: panelDefaultPadding }}
            action={
              <HStack alignItems="center" gap={2}>
                <IconButton
                  title="Delete this music"
                  kind="secondary"
                  icon={<TrashBinIcon />}
                  onClick={() => {
                    updateUser({
                      focusSounds: focusSounds.filter(
                        (sound) => sound.url !== url,
                      ),
                    })
                  }}
                />
                <IconButton
                  title="Edit this music"
                  kind="secondary"
                  onClick={onOpen}
                  icon={<EditIcon />}
                />
                <IconButton
                  title="Favourite"
                  kind="secondary"
                  icon={star}
                  onClick={() => {
                    updateUser({
                      focusSounds: focusSounds.map((sound) => {
                        if (sound.url === url) {
                          return {
                            ...sound,
                            favourite: !sound.favourite,
                          }
                        }
                        return sound
                      }),
                    })
                  }}
                />
              </HStack>
            }
            render={({ actionSize }) => (
              <Container
                onClick={() => {
                  if (isActive) {
                    setState((state) => ({
                      ...state,
                      isPlaying: !state.isPlaying,
                    }))
                  } else {
                    setPreference((state) => ({
                      ...state,
                      url,
                    }))
                  }
                }}
                key={url}
              >
                <Identifier>
                  {!isActive && <SoundNumber>{index + 1}.</SoundNumber>}
                  <PlayIndicator isActive={isActive}>
                    {isActive && isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </PlayIndicator>
                </Identifier>
                <Text
                  style={{ maxWidth: '100%' }}
                  cropped
                  color={isActive ? 'regular' : undefined}
                >
                  {name}
                </Text>
                {actionSize && (
                  <UniformColumnGrid style={actionSize} gap={0}>
                    <div />
                    <Center>{favourite && star}</Center>
                  </UniformColumnGrid>
                )}
              </Container>
            )}
          />
        )
      }
      renderContent={({ onClose }) => (
        <EditSoundForm onFinish={onClose} value={{ name, url }} />
      )}
    />
  )
}
