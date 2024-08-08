import { interactive } from '@lib/ui/css/interactive'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { verticalPadding } from '@lib/ui/css/verticalPadding'

export const InteractiveRow = styled.div<{ isActive: boolean }>`
  ${interactive}

  ${verticalPadding(8)};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
        `
      : css`
          color: ${getColor('textSupporting')};
          &:hover {
            background: ${getColor('mist')};
          }
        `};
`
