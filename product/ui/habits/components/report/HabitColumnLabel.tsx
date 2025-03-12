import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { text } from '@lib/ui/text'
import styled from 'styled-components'

import { trackHabitsConfig } from '../track/config'

export const HabitColumnLabel = styled.p`
  ${text({
    nowrap: true,
    size: 12,
  })}
  line-height: ${toSizeUnit(trackHabitsConfig.labelHeight)};
`
