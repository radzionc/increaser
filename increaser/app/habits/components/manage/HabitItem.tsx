import styled from 'styled-components'
import { Hoverable } from '@lib/ui/base/Hoverable'
import { verticalPadding } from '@lib/ui/css/verticalPadding'
import { habitVerticalPadding } from './config'
import { useActiveItemId } from '@lib/ui/list/ActiveItemIdProvider'
import { useCurrentHabit } from '@increaser/ui/habits/CurrentHabitProvider'
import { EditHabitForm } from './form/EditHabitForm'
import { HabitItemContent } from './HabitItemContent'

const Container = styled(Hoverable)`
  ${verticalPadding(habitVerticalPadding)};
  text-align: start;
  width: 100%;
`

export const HabitItem = () => {
  const { id } = useCurrentHabit()

  const [activeItemId, setActiveItemId] = useActiveItemId()

  if (activeItemId === id) {
    return <EditHabitForm />
  }

  return (
    <Container
      onClick={() => {
        setActiveItemId(id)
      }}
      verticalOffset={0}
    >
      <HabitItemContent />
    </Container>
  )
}
