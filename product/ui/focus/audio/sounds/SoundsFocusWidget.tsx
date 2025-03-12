import { UniformColumnGrid } from '@lib/ui/css/uniformColumnGrid'
import { ModalContent } from '@lib/ui/modal/ModalContent'
import styled from 'styled-components'

import { focusSounds } from '../focusSounds'

import { FocusSoundOption } from './FocusSoundOption'

const Content = styled(ModalContent)`
  padding: 0;
  padding-bottom: 12px;
`

export const SoundsFocusWidget = () => {
  return (
    <Content>
      <UniformColumnGrid gap={0} minChildrenWidth={100}>
        {focusSounds.map((sound) => (
          <FocusSoundOption key={sound} value={sound} />
        ))}
      </UniformColumnGrid>
    </Content>
  )
}
