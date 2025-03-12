import { UnstyledButton } from '@lib/ui/buttons/UnstyledButton'
import { borderRadius } from '@lib/ui/css/borderRadius'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { tightListItemConfig } from '@lib/ui/list/tightListItemConfig'
import { IsActiveProp } from '@lib/ui/props'
import { getColor } from '@lib/ui/theme/getters'
import styled, { css } from 'styled-components'

export const LinkActionContainer = styled(UnstyledButton)<IsActiveProp>`
  border: 1px solid transparent;

  ${borderRadius.m};

  color: ${getColor('textSupporting')};
  font-weight: 600;

  &:hover {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
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
