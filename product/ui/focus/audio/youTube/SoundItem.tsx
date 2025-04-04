import { OnHoverAction } from '@lib/ui/base/OnHoverAction'
import { Opener } from '@lib/ui/base/Opener'
import { IconButton } from '@lib/ui/buttons/IconButton'
import { HSLA } from '@lib/ui/colors/HSLA'
import { centerContent } from '@lib/ui/css/centerContent'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { HStack } from '@lib/ui/css/stack'
import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { PauseIcon } from '@lib/ui/icons/PauseIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { StarIcon } from '@lib/ui/icons/StarIcon'
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { Center } from '@lib/ui/layout/Center'
import { Text } from '@lib/ui/text'
import { FocusSound } from '@product/entities/FocusSound'
import { useUpdateUserMutation } from '@product/ui/user/mutations/useUpdateUserMutation'
import { useUser } from '@product/ui/user/state/user'
import styled, { useTheme } from 'styled-components'

import { EditSoundForm } from './musicForm/EditSoundForm'
import {
  PlayIndicator,
  SoundItemContainer,
  SoundNumber,
} from './SoundItemContainer'
import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'

const Identifier = styled.div`
  width: 100%;
  height: 100%;
  ${centerContent};
  position: relative;
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
  const { focusSounds } = useUser()
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
              <SoundItemContainer
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
                    <div />
                    <Center>{favourite && star}</Center>
                  </UniformColumnGrid>
                )}
              </SoundItemContainer>
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
