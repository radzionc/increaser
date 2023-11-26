import styled from 'styled-components'

import { VStack } from './Stack'
import { getColor } from '../theme/getters'
import { toSizeUnit } from '../css/toSizeUnit'

export const SeparatedByLine = styled(VStack)`
  > *:not(:last-child) {
    border-bottom: 1px solid ${getColor('mistExtra')};
    padding-bottom: ${({ gap = 0 }) => toSizeUnit(gap)};
  }
`
