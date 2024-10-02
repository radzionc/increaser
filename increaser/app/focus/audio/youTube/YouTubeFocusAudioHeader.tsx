import { hStack } from '@lib/ui/css/stack'
import styled from 'styled-components'
import { YouTubeViewSelector } from './YouTubeViewSelector'
import { AddYouTubeVideo } from './add/AddYouTubeVideo'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { modalConfig } from '@lib/ui/modal/config'
import { getColor } from '@lib/ui/theme/getters'
import { youTubeWidgetConfig } from './config'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

const Container = styled.div`
  position: relative;
  ${verticalPadding(0)}
  flex-shrink: 0;

  ${hStack({
    fullWidth: true,
    justifyContent: 'space-between',
    alignItems: 'center',
  })}

  padding-right: ${toSizeUnit(modalConfig.padding)};
  padding-left: ${toSizeUnit(youTubeWidgetConfig.navigation.leftOffset)};

  height: 52px;
`

const Underline = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  pointer-events: none;
  border-bottom: ${toSizeUnit(youTubeWidgetConfig.navigation.borderWidth)} solid
    ${getColor('mist')};
`

export const YouTubeFocusAudioHeader = () => {
  return (
    <Container>
      <YouTubeViewSelector />
      <AddYouTubeVideo />
      <Underline />
    </Container>
  )
}
