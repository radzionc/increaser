import { AddSound } from './AddSound'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import styled from 'styled-components'
import { SoundItem } from './SoundItem'
import { match } from '@lib/utils/match'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { Opener } from '@lib/ui/base/Opener'
import { AddSoundPrompt } from './AddSoundPrompt'

const soundsViews = ['all', 'favourites'] as const
type SoundsView = (typeof soundsViews)[number]

const Container = styled(ScrollableFlexboxFiller)`
  min-height: 400px;
`

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
    <Container>
      <Opener
        renderOpener={({ onOpen, isOpen }) =>
          isOpen ? null : <AddSoundPrompt onClick={onOpen} />
        }
        renderContent={({ onClose }) => <AddSound onFinish={onClose} />}
      />
      {soundsToDisplay.map((sound, index) => (
        <SoundItem key={index} index={index} {...sound} />
      ))}
    </Container>
  )
}
