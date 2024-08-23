import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const HeaderActionButton = styled(UnstyledButton)`
  ${sameDimensions(40)};
  color: ${getColor('contrast')};
  ${borderRadius.s};
  ${centerContent};
  font-size: 16px;
  &:hover {
    background: ${getColor('mist')};
  }
`
