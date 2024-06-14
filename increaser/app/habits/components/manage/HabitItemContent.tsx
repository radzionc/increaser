import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { habitContentMinHeight } from './config'
import { getColor } from '@lib/ui/theme/getters'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'

const Name = styled(Text)`
  text-align: start;
  font-weight: 500;
  color: ${getColor('contrast')};
  font-size: 14px;
  line-height: ${toSizeUnit(habitContentMinHeight)};
`

export const HabitItemContent = () => {
  const { name, emoji } = useCurrentHabit()

  return (
    <Name>
      <EmojiTextPrefix emoji={emoji} />
      {name}
    </Name>
  )
}
