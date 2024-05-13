import { borderRadius } from '@lib/ui/css/borderRadius'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

export const InteractiveRow = styled.div<{ isActive: boolean }>`
  ${transition}
  ${interactive}
  ${borderRadius.s};

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
