import styled, { css } from 'styled-components'
import { ComponentWithActiveState } from '@lib/ui/props'
import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'

import { getColor } from '@lib/ui/theme/getters'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { borderRadius } from '@lib/ui/css/borderRadius'

export const LinkActionContainer = styled(
  UnstyledButton,
)<ComponentWithActiveState>`
  border: 1px solid transparent;

  ${borderRadius.m};

  &:hover {
    background: ${getColor('mist')};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border-color: ${getColor('text')};
    `}

  ${horizontalPadding(tightListItemConfig.horizontalOffset)};
  padding-right: ${toSizeUnit(tightListItemConfig.horizontalOffset + 4)};

  ${hStack({
    alignItems: 'center',
    gap: 8,
  })}
`
