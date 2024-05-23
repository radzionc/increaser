import { useState } from 'react'
import { Button } from '@lib/ui/buttons/Button'
import { ArrowLeftIcon } from '@lib/ui/icons/ArrowLeftIcon'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'

import { AddSound } from './AddSound'
import { Match } from '@lib/ui/base/Match'
import { TabNavigation } from '@lib/ui/navigation/TabNavigation'
import { capitalizeFirstLetter } from '@lib/utils/capitalizeFirstLetter'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import styled from 'styled-components'
import { SoundItem } from './FocusSoundsList/SoundItem'
import { match } from '@lib/utils/match'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useYouTubeFocusMusic } from './YouTubeFocusMusicProvider'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'

const focusSoundsViews = ['player', 'add'] as const
type FocusSoundsView = (typeof focusSoundsViews)[number]

const soundsViews = ['all', 'favourites'] as const
type SoundsView = (typeof soundsViews)[number]

const Content = styled(VStack)`
  align-items: start;
  padding: 0;
  ${verticalPadding(8)}
  flex: 1;
  position: relative;
`

const Container = styled(ScrollableFlexboxFiller)`
  min-height: 400px;
`

export const YouTubeFocusWidget = () => {
  const { focusSounds } = useAssertUserState()
  const { setState } = useYouTubeFocusMusic()
  const [view, setView] = useState<FocusSoundsView>('player')

  const [soundsView, setSoundsView] = usePersistentState<SoundsView>(
    PersistentStateKey.FocusSoundsView,
    'all',
  )

  const soundsToDisplay = match(soundsView, {
    all: () => focusSounds,
    favourites: () => focusSounds.filter((sound) => sound.favourite),
  })

  return (
    <>
      <HStack fullWidth alignItems="center" justifyContent="space-between">
        <TabNavigation<SoundsView>
          views={soundsViews}
          getViewName={capitalizeFirstLetter}
          activeView={soundsView}
          onSelect={setSoundsView}
          size="s"
        />
        <Match
          value={view}
          player={() => (
            <Button
              onClick={() => {
                setState((state) => ({ ...state, isPlaying: false }))
                setView('add')
              }}
              size="s"
              kind="secondary"
            >
              <HStack alignItems="center" gap={8}>
                <PlusIcon /> Add
              </HStack>
            </Button>
          )}
          add={() => (
            <Button onClick={() => setView('player')} size="s" kind="secondary">
              <HStack alignItems="center" gap={8}>
                <ArrowLeftIcon /> Back
              </HStack>
            </Button>
          )}
        />
      </HStack>
      <Match
        value={view}
        player={() => (
          <Container>
            <Content fullHeight fullWidth alignItems="center">
              {soundsToDisplay.map((sound, index) => (
                <SoundItem key={index} index={index} {...sound} />
              ))}
            </Content>
          </Container>
        )}
        add={() => (
          <AddSound
            onFinish={() => {
              setView('player')
            }}
          />
        )}
      />
    </>
  )
}
