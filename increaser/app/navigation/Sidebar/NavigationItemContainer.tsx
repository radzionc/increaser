import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { interactive } from '@lib/ui/css/interactive'
import { transition } from '@lib/ui/css/transition'
import { ComponentWithActiveState } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { sidebarConfig } from './config'

export const NavigationItemContainer = styled.div<ComponentWithActiveState>`
  ${horizontalPadding(sidebarConfig.item.horizontalPadding)};
  ${verticalPadding(sidebarConfig.item.verticalPadding)};

  ${interactive};
  display: flex;
  align-items: center;
  width: 100%;
  ${transition};
  ${borderRadius.s};
  color: ${getColor('text')};
  position: relative;

  &:hover {
    background: ${getColor('mist')};
  }

  &:active {
    background: ${getColor('mistExtra')};
  }

  ${({ isActive }) =>
    isActive
      ? css`
          ${getColor('textPrimary')};
        `
      : css`
          svg {
            color: ${getColor('textSupporting')};
          }
        `}
`
