import { text, Text } from '../text'
import styled from 'styled-components'

export const InputLabel = styled(Text)`
  ${text({
    size: 13,
    color: 'supporting',
  })}
`

InputLabel.defaultProps = {
  size: 13,
  color: 'supporting',
  as: 'div',
}
