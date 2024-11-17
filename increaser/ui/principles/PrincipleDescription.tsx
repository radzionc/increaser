import styled from 'styled-components'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'

export const PrincipleDescription = styled(Text)`
  font-size: 14px;
  color: ${getColor('textSupporting')};
  white-space: pre-line;
  line-height: 1.5;
`
