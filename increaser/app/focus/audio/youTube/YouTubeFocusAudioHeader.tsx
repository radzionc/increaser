import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { VStack } from '@lib/ui/css/stack'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { modalConfig } from '@lib/ui/modal/config'
import styled from 'styled-components'
import { YouTubeViewSelector } from './YouTubeViewSelector'

const Container = styled(VStack)`
  ${verticalPadding(8)};
  ${horizontalPadding(modalConfig.padding)};
`

export const YouTubeFocusAudioHeader = () => {
  return (
    <Container>
      <YouTubeViewSelector />
    </Container>
  )
}
