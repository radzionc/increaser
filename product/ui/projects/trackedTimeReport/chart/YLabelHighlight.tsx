import { text } from '@lib/ui/text'
import styled from 'styled-components'

export const YLabelHighlight = styled.div`
  position: relative;
  isolation: isolate;
  ${text({
    weight: '600',
    color: 'contrast',
    size: 12,
  })}
`
