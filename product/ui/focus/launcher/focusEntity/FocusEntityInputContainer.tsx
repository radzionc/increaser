import { ActionsInsideInteractiveElement } from '@lib/ui/base/ActionsInsideInteractiveElement'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'

import { focusEntityConfig } from './config'
export const FocusEntityInputContainer = styled(
  ActionsInsideInteractiveElement,
)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: ${toSizeUnit(focusEntityConfig.height)};
  position: relative;
`
