import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const PrincipleName = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
`
