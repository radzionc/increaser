import { IconButton } from '@lib/ui/buttons/IconButton'
import { sameDimensions } from '@lib/ui/css/sameDimensions'
import { IsActiveProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

export const FocusHeaderIconButton = styled(IconButton)<Partial<IsActiveProp>>`
  ${sameDimensions(40)};
  font-size: 20px;
  background: transparent;
  border: 1px solid ${getColor('mistExtra')};
  color: ${getColor('contrast')};

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${getColor('text')};
    `}
`
