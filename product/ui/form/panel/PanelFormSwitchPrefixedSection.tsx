import { horizontalPadding } from '@lib/ui/css/horizontalPadding'
import { panelDefaultPadding } from '@lib/ui/css/panel'
import { hStack } from '@lib/ui/css/stack'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

import { panelFormConfig } from './config'

export const PanelFormSwitchPrefixedSection = styled.div`
  padding: 0;

  min-height: ${toSizeUnit(panelFormConfig.sectionMinHeight)};

  > * {
    &:first-child {
      ${horizontalPadding(panelDefaultPadding)};
    }

    &:only-child {
      flex: 1;
    }
  }

  ${hStack({ alignItems: 'stretch', fullWidth: true, wrap: 'wrap' })}
`
