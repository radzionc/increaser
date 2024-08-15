import { VStack } from '@lib/ui/layout/Stack'
import { FocusTaskOption } from './FocusTaskOption'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { AddTask } from './AddTask'
import { useFocusTaskGroups } from '../tasks/useFocusTaskGroups'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import styled from 'styled-components'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'
import { useFocusTasks } from '../tasks/useFocusTasks'

const Container = styled(SeparatedByLine)`
  gap: 20px;

  max-height: 320px;
  overflow-y: auto;
`

export const FocusTaskInput = () => {
  const groups = useFocusTaskGroups()

  const options = useFocusTasks()

  const hasOptions = options.length > 0

  return (
    <Container gap={20}>
      {hasOptions && (
        <VStack gap={20}>
          {groups.map(({ name, tasks }) => (
            <InputContainer key={name} as="div">
              <LabelText>{name}</LabelText>
              <VStack gap={4}>
                {tasks.map((task) => (
                  <CurrentTaskProvider value={task} key={task.id}>
                    <FocusTaskOption />
                  </CurrentTaskProvider>
                ))}
              </VStack>
            </InputContainer>
          ))}
        </VStack>
      )}
      <AddTask />
    </Container>
  )
}
