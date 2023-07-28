import styled from 'styled-components'
import { Text } from '../Text'

export const InputErrorText = styled(Text)`
  --height: 0.86em;
  line-height: var(--height);
  font-size: var(--height);
  min-height: var(--height);
`
InputErrorText.defaultProps = {
  color: 'alert',
}
