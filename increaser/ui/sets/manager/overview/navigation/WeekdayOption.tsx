import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { getColor } from '@lib/ui/theme/getters'
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
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;

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
          color: ${getColor('text')};
          border-color: ${getColor('text')};
        `
      : css`
          &:hover {
            color: ${getColor('text')};
            border-color: ${getColor('mist')};
          }
        `}
`
