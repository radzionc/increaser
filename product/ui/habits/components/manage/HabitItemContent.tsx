import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'
import { Text } from '@lib/ui/text'
import { useCurrentHabit } from '@product/ui/habits/CurrentHabitProvider'
import styled from 'styled-components'

import { habitContentMinHeight } from './config'

const Name = styled(Text)`
  text-align: start;
  line-height: ${toSizeUnit(habitContentMinHeight)};
`

export const HabitItemContent = () => {
  const { name, emoji } = useCurrentHabit()

  return (
    <PrefixedItemFrame prefix={<Text color="contrast">{emoji}</Text>}>
      <Name>{name}</Name>
    </PrefixedItemFrame>
  )
}
