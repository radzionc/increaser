import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { getColor } from '@lib/ui/theme/getters'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { ChecklistItemFrame } from '@lib/ui/checklist/ChecklistItemFrame'
import { Center } from '@lib/ui/layout/Center'
import { habitContentMinHeight } from './config'

const Name = styled(Text)`
  text-align: start;
  color: ${getColor('contrast')};
  line-height: ${toSizeUnit(habitContentMinHeight)};
`

export const HabitItemContent = () => {
  const { name, emoji } = useCurrentHabit()

  return (
    <ChecklistItemFrame>
      <Center>
        <Text color="contrast">{emoji}</Text>
      </Center>
      <Name>{name}</Name>
    </ChecklistItemFrame>
  )
}
