import { EnhancedHabit } from '@increaser/ui/habits/EnhancedHabit'
import { IncludedItem } from '@lib/ui/inputs/IncludedItem'
import { HStack } from '@lib/ui/layout/Stack'
import { Text } from '@lib/ui/text'
import styled from 'styled-components'
import { useDeleteHabitMutation } from '../../habits/api/useDeleteHabitMutation'

type HabitItemProps = {
  value: EnhancedHabit
}

const Content = styled(HStack)`
  overflow: hidden;
  flex: 1;
  align-items: center;
  gap: 8px;
`

const Container = styled(IncludedItem)`
  position: relative;
  padding-left: 16px;
`

export const HabitItem = ({ value }: HabitItemProps) => {
  const { mutate: deleteHabit } = useDeleteHabitMutation()

  return (
    <Container onRemove={() => deleteHabit({ id: value.id })}>
      <Content>
        <Text color="contrast" size={18}>
          {value.emoji}
        </Text>
        <Text color="contrast" cropped weight="semibold">
          {value.name}
        </Text>
      </Content>
    </Container>
  )
}
