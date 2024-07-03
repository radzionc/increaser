import styled, { useTheme } from 'styled-components'
import { IconButton } from '@lib/ui/buttons/IconButton'
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
import { TrashBinIcon } from '@lib/ui/icons/TrashBinIcon'
import { EditIcon } from '@lib/ui/icons/EditIcon'
import { EditSoundForm } from './musicForm/EditSoundForm'
import {
  PlayIndicator,
  SoundItemContainer,
  SoundNumber,
} from './SoundItemContainer'
import { focusSetWidgetConfig } from '../../components/FocusSetWidget/config'

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
            actionPlacerStyles={{ right: focusSetWidgetConfig.padding }}
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
