import styled from 'styled-components'
import { textInputPadding } from '../../css/textInput'
import { fixedOptionsInputConfig } from './config'
import { toSizeUnit } from '../../css/toSizeUnit'

export const FixedOptionsInputIdentifierWrapper = styled.div`
  position: absolute;
  font-size: ${toSizeUnit(fixedOptionsInputConfig.identifierSize)};
  left: ${toSizeUnit(textInputPadding)};
  pointer-events: none;
  display: flex;
`
