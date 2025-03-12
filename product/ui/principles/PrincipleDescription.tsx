import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const PrincipleDescription = styled(Text)`
  font-size: 14px;
  color: ${getColor('textSupporting')};
  white-space: pre-line;
  line-height: 1.5;
`
