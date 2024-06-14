import { VStack } from '@lib/ui/layout/Stack'
import { ActiveItemIdProvider } from '@lib/ui/list/ActiveItemIdProvider'
import styled from 'styled-components'
import { Habits } from './Habits'
import { AddHabit } from './AddHabit'

const Container = styled(VStack)`
  max-width: 520px;
`

export const ManageHabits = () => {
  return (
    <Container>
      <ActiveItemIdProvider initialValue={null}>
        <Habits />
        <AddHabit />
      </ActiveItemIdProvider>
    </Container>
  )
}
