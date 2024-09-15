import { AddSound } from './AddSound'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { SoundItem } from './SoundItem'
import { match } from '@lib/utils/match'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { Opener } from '@lib/ui/base/Opener'
import { AddSoundPrompt } from './AddSoundPrompt'
import { VStack } from '@lib/ui/css/stack'

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
    <VStack>
      <Opener
        renderOpener={({ onOpen, isOpen }) =>
          isOpen ? null : <AddSoundPrompt onClick={onOpen} />
        }
        renderContent={({ onClose }) => <AddSound onFinish={onClose} />}
      />
      {soundsToDisplay.map((sound, index) => (
        <SoundItem key={index} index={index} {...sound} />
      ))}
    </VStack>
  )
}
