import { capitalizeFirstLetter } from 'shared/utils/capitalizeFirstLetter'
import { match } from 'shared/utils/match'
import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentStorageValue } from 'state/persistentStorage'
import styled from 'styled-components'
import { VStack } from '@increaser/ui/ui/Stack'
import { TabNavigation } from '@increaser/ui/ui/TabNavigation'

import { useFocusSounds } from '../useFocusSounds'
import { SoundItem } from './SoundItem'
import { SoundsPlayer } from './SoundsPlayer'

const Content = styled(VStack)`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
`

const soundsViews = ['all', 'favourites'] as const
type SoundsView = (typeof soundsViews)[number]

export const FocusSoundsList = () => {
  const [view, setView] = usePersistentStorageValue<SoundsView>(
    PersistentStorageKey.FocusSoundsView,
    'all',
  )
  const { sounds, activeSoundUrl } = useFocusSounds()

  const soundsToDisplay = match(view, {
    all: () => sounds,
    favourites: () => sounds.filter((sound) => sound.favourite),
  })

  return (
    <>
      {activeSoundUrl && <SoundsPlayer />}

      <TabNavigation<SoundsView>
        style={{ padding: '8px 16px' }}
        views={soundsViews}
        getViewName={capitalizeFirstLetter}
        activeView={view}
        onSelect={setView}
        groupName="sounds"
        size="s"
      />
      <Content fullHeight fullWidth gap={8} alignItems="center">
        <VStack fullWidth>
          {soundsToDisplay.map((sound, index) => (
            <SoundItem key={index} index={index} {...sound} />
          ))}
        </VStack>
      </Content>
    </>
  )
}
