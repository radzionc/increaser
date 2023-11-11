import styled from 'styled-components'
import { toSizeUnit } from '../../css/toSizeUnit'
import { getColor } from '../../ui/theme/getters'
import { textInputBorderRadius } from '../../css/textInput'

export const OptionsContainer = styled.div`
  z-index: 1;
  background: ${getColor('foreground')};
  border: 1px solid ${getColor('mist')};

  border-radius: ${toSizeUnit(textInputBorderRadius)};
  overflow: hidden;
  max-height: 280px;
  overflow-y: auto;

  display: none;
`
