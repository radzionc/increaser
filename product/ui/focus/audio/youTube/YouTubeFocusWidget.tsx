import { hideScrollbars } from '@lib/ui/css/hideScrollbars'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import { match } from '@lib/utils/match'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'
import { useUser } from '@product/ui/user/state/user'
import styled from 'styled-components'

import { SoundItem } from './SoundItem'
import { YouTubeFocusAudioHeader } from './YouTubeFocusAudioHeader'

const Content = styled(ModalContent)`
  padding: 0;
  ${verticalPadding(12)};
  ${hideScrollbars};
`

export const soundsViews = ['all', 'favourites'] as const
type SoundsView = (typeof soundsViews)[number]

export const YouTubeFocusWidget = () => {
  const { focusSounds } = useUser()

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
