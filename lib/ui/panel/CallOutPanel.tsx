import styled from 'styled-components'
import { interactive } from '../css/interactive'
import { transition } from '../css/transition'
import { getColor } from '../theme/getters'
import { Panel } from './Panel'

export const CallOutPanel = styled(Panel)`
  ${interactive};
  color: ${getColor('contrast')};
  border: 2px dashed ${getColor('primary')};

  ${transition};
  &:hover {
    background: ${getColor('foreground')};
  }
`
