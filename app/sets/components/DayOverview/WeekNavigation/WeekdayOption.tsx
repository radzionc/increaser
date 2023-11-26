import { centerContent } from '@increaser/ui/css/centerContent'
import { interactive } from '@increaser/ui/css/interactive'
import { transition } from '@increaser/ui/css/transition'
import { getColor } from '@increaser/ui/theme/getters'
import styled, { css } from 'styled-components'

interface WeekdayOptionProps {
  isActive: boolean
  isEnabled: boolean
}

export const WeekdayOption = styled.label<WeekdayOptionProps>`
  ${centerContent}
  ${transition}
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  border: 2px solid transparent;

  ${({ isEnabled }) =>
    isEnabled
      ? css`
          ${interactive}
          color: ${getColor('textSupporting')};
        `
      : css`
          pointer-events: none;
          color: ${getColor('textShy')};
        `}

  ${({ isActive }) =>
    isActive
      ? css`
          color: ${getColor('contrast')};
          background: ${getColor('mist')};
        `
      : css`
          :hover {
            color: ${getColor('text')};
            border-color: ${getColor('mist')};
          }
        `}
`
