import { capitalizeFirstLetter } from '@increaser/utils/capitalizeFirstLetter'
import { match } from '@increaser/utils/match'
import { PersistentStateKey } from 'state/persistentState'
import { usePersistentState } from 'state/persistentState'
import styled from 'styled-components'
import { VStack } from '@increaser/ui/layout/Stack'
import { TabNavigation } from '@increaser/ui/navigation/TabNavigation'

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
  const [view, setView] = usePersistentState<SoundsView>(
    PersistentStateKey.FocusSoundsView,
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
