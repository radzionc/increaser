import { absoluteOutline } from '@lib/ui/css/absoluteOutline'
import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { interactive } from '@lib/ui/css/interactive'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack } from '@lib/ui/css/stack'
import { takeWholeSpace } from '@lib/ui/css/takeWholeSpace'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { FocusIconButton } from '../../FocusSetWidget/FocusIconButton'

import { focusEntityConfig } from './config'

export const FocusEntityInputIndicator = styled(FocusIconButton)``

export const FocusEntityInputLabel = styled.p`
  ${text({
    color: 'supporting',
  })}
`

export const FocusEntityInputContent = styled.div`
  ${hStack({
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  })}

  position: relative;

  ${interactive};
  ${takeWholeSpace};

  ${horizontalPadding(panelDefaultPadding)};
  padding-right: ${toSizeUnit(focusEntityConfig.rightPadding)};

  &:hover ${FocusEntityInputIndicator} {
    background: ${getColor('mist')};
    color: ${getColor('contrast')};
  }

  &:hover ${FocusEntityInputLabel} {
    color: ${getColor('textPrimary')};
  }
`

export const FocusEntityInputUnderline = styled.div`
  ${absoluteOutline(0, 2)};
  border-bottom: 2px dashed ${getColor('mistExtra')};
`
