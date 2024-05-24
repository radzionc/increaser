import { useState } from 'react'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import { HStack, VStack } from '@lib/ui/layout/Stack'

import { AddSound } from './AddSound'
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
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { ScrollableFlexboxFiller } from '@lib/ui/layout/ScrollableFlexboxFiller'
import { IconButton } from '@lib/ui/buttons/IconButton'

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
  const [isAddingVideo, setIsAddingVideo] = useState(false)

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
        />
        {!isAddingVideo && (
          <IconButton
            icon={<PlusIcon />}
            title="Add YouTube video"
            onClick={() => {
              setIsAddingVideo(true)
            }}
            size="l"
          />
        )}
      </HStack>
      {isAddingVideo && (
        <AddSound
          onFinish={() => {
            setIsAddingVideo(false)
          }}
        />
      )}
      <Container>
        <Content fullHeight fullWidth alignItems="center">
          {soundsToDisplay.map((sound, index) => (
            <SoundItem key={index} index={index} {...sound} />
          ))}
        </Content>
      </Container>
    </>
  )
}
