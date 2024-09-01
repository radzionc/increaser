import { FocusTaskOption } from './FocusTaskOption'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { AddTask } from './AddTask'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'
import { useFilteredFocusTasks } from '../tasks/useFilteredFocusTasks'

const Container = styled(VStack)`
  gap: 4px;
`

export const FocusTaskInput = () => {
  const options = useFilteredFocusTasks()

  return (
    <Container>
      {options.map((task) => (
        <CurrentTaskProvider value={task} key={task.id}>
          <FocusTaskOption />
        </CurrentTaskProvider>
      ))}
      <AddTask />
    </Container>
  )
}
