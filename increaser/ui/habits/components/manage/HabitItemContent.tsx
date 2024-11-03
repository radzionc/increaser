import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { habitContentMinHeight } from './config'
import { PrefixedItemFrame } from '@lib/ui/list/PrefixedItemFrame'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
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
