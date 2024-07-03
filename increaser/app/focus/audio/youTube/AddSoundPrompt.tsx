import { ClickableComponentProps } from '@lib/ui/props'
import { SoundItemContainer } from './SoundItemContainer'
import { IconWrapper } from '@lib/ui/icons/IconWrapper'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Container = styled(SoundItemContainer)`
  color: ${getColor('textShy')};
`

const IconContainer = styled(IconWrapper)`
  width: 100%;
  height: 32px;
  color: ${getColor('primary')};
`

export const AddSoundPrompt = ({ onClick }: ClickableComponentProps) => (
  <Container onClick={onClick}>
    <IconContainer>
      <PlusIcon />
    </IconContainer>
    Add a YouTube video
  </Container>
)
