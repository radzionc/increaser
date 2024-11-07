import { HStack, VStack, vStack } from '@lib/ui/css/stack'
import {
  InfoYouTubeVideo,
  infoYouTubeVideos,
} from '@increaser/info/infoYouTubeVideos'
import { useState } from 'react'
import { VideoNavigation } from './VideoNavigation'
import { VideoPlayer } from './VideoPlayer'
import { useIsScreenWidthLessThan } from '@lib/ui/hooks/useIsScreenWidthLessThan'
import styled from 'styled-components'
import { uniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'

const itemWidth = 248

const NormalScreenNavigationContainer = styled.div`
  ${vStack({
    gap: 4,
  })}
  min-width: ${toSizeUnit(itemWidth)};
`

const SmallScreenNavigationContainer = styled.div`
  ${uniformColumnGrid({
    minChildrenWidth: itemWidth,
    gap: 4,
  })}
`

export const VideoSliceContent = () => {
  const [value, setValue] = useState<InfoYouTubeVideo>('focus')

  const url = infoYouTubeVideos[value]

  const isSmallScreen = useIsScreenWidthLessThan(1000)

  const navigation = <VideoNavigation value={value} onChange={setValue} />
  const player = <VideoPlayer value={url} />

  if (isSmallScreen) {
    return (
      <VStack fullWidth gap={20}>
        <SmallScreenNavigationContainer>
          {navigation}
        </SmallScreenNavigationContainer>
        {player}
      </VStack>
    )
  }

  return (
    <HStack fullWidth gap={20}>
      <NormalScreenNavigationContainer>
        {navigation}
      </NormalScreenNavigationContainer>
      {player}
    </HStack>
  )
}
