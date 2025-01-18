import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import styled from 'styled-components'
import { focusLauncherConfig } from './config'
import { ActionsInsideInteractiveElement } from '@lib/ui/base/ActionsInsideInteractiveElement'

export const FocusEntityInputContainer = styled(
  ActionsInsideInteractiveElement,
)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
  height: ${toSizeUnit(focusLauncherConfig.sectionMinHeight)};
  position: relative;
`
