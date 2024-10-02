import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { SoundItem } from './SoundItem'
import { match } from '@lib/utils/match'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { YouTubeFocusAudioHeader } from './YouTubeFocusAudioHeader'
import styled from 'styled-components'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { hideScrollbars } from '@lib/ui/css/hideScrollbars'

const Content = styled(ModalContent)`
  padding: 0;
  ${verticalPadding(12)};
  ${hideScrollbars};
`

const soundsViews = ['all', 'favourites'] as const
type SoundsView = (typeof soundsViews)[number]

export const YouTubeFocusWidget = () => {
  const { focusSounds } = useAssertUserState()

  const [soundsView] = usePersistentState<SoundsView>(
    PersistentStateKey.FocusSoundsView,
    'all',
  )

  const soundsToDisplay = match(soundsView, {
    all: () => focusSounds,
    favourites: () => focusSounds.filter((sound) => sound.favourite),
  })

  return (
    <>
      <YouTubeFocusAudioHeader />
      <Content>
        {soundsToDisplay.map((sound, index) => (
          <SoundItem key={index} index={index} {...sound} />
        ))}
      </Content>
    </>
  )
}
