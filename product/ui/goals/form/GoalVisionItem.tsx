import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

import { useCurrentVisionAttribute } from '../../vision/CurrentVisionAttributeProvider'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
`

export const GoalVisionItem = () => {
  const { name, emoji } = useCurrentVisionAttribute()

  return (
    <PrefixedItemFrame prefix={<Text color="contrast">{emoji}</Text>}>
      <Name>{name}</Name>
    </PrefixedItemFrame>
  )
}
