import { interactive } from '@lib/ui/css/interactive'
import { HStack } from '@lib/ui/css/stack'
import { transition } from '@lib/ui/css/transition'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PauseIcon } from '@lib/ui/icons/PauseIcon'
import { PlayIcon } from '@lib/ui/icons/PlayIcon'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useUser } from '@product/ui/user/state/user'
import styled from 'styled-components'

import { useYouTubeFocusPreference } from './state/useYouTubeFocusPreference'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'

const Container = styled(HStack)`
  ${interactive};
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
  ${transition};
  &:hover {
    color: ${getColor('contrast')};
  }
`

export const ManageCurrentYouTubeMusic = () => {
  const [{ url }] = useYouTubeFocusPreference()
  const { focusSounds } = useUser()
  const { isPlaying, setState } = useYouTubeFocusMusic()

  const { name } = shouldBePresent(
    focusSounds.find((sound) => sound.url === url),
  )

  return (
    <Container
      onClick={() => {
        setState((state) => ({ ...state, isPlaying: !state.isPlaying }))
      }}
    >
      <IconWrapper>{isPlaying ? <PauseIcon /> : <PlayIcon />}</IconWrapper>
      <Text cropped>{name}</Text>
    </Container>
  )
}
