import styled, { css } from 'styled-components'
import { getColor } from '../theme/getters'
import { defaultInputHeight } from './config'
import { UnstyledButton } from '../buttons/UnstyledButton'
import { borderRadius } from '../css/borderRadius'
import { centerContent } from '../css/centerContent'
import { sameDimensions } from '../css/sameDimensions'
import { transition } from '../css/transition'
import { ComponentWithActiveState } from '../props'
import { getHoverVariant } from '../theme/getHoverVariant'

export const ExpandableInputOpener = styled(
  UnstyledButton,
)<ComponentWithActiveState>`
  ${centerContent}
  ${borderRadius.m}
  ${transition}

  ${sameDimensions(defaultInputHeight)};
  border: 1px solid ${getColor('mist')};

  background: ${getColor('foreground')};

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${getHoverVariant('foreground')};
      border-color: ${getColor('mistExtra')};
    `}

  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`
