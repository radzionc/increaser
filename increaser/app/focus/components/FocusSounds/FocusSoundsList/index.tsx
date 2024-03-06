import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import { match } from '@lib/utils/match'
import { PersistentStateKey } from '@increaser/app/state/persistentState'
import { usePersistentState } from '@increaser/app/state/persistentState'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'
import { TabNavigation } from '@lib/ui/navigation/TabNavigation'

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
