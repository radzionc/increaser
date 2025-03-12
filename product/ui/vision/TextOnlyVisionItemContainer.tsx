import { borderRadius } from '@lib/ui/css/borderRadius'
import { centerContent } from '@lib/ui/css/centerContent'
import { interactive } from '@lib/ui/css/interactive'
import { text } from '@lib/ui/text'
import { getHoverVariant } from '@lib/ui/theme/getHoverVariant'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

export const TextOnlyVisionItemContainer = styled.div`
  ${borderRadius.m};

  ${text({
    color: 'contrast',
    weight: '600',
    size: 20,
    height: 'l',
    centerHorizontally: true,
  })}

  padding: 20px;

  ${centerContent};

  min-height: 320px;

  background: ${getColor('foreground')};

  ${interactive};

  &:hover {
    background: ${getHoverVariant('foreground')};
  }
`
