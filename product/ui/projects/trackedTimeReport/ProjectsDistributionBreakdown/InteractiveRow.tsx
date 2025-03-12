import { interactive } from '@lib/ui/css/interactive'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

export const InteractiveRow = styled.div<{ isActive: boolean }>`
  ${interactive}

  ${verticalPadding(8)};

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
          background: ${getColor('mist')};
        `
      : css`
          color: ${getColor('textSupporting')};
          &:hover {
            background: ${getColor('mist')};
          }
        `};
`
