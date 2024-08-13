import { VStack } from '@lib/ui/layout/Stack'
import { useEffect, useMemo } from 'react'
import { FocusTaskOption } from './FocusTaskOption'
import { useFocusLauncher } from './state/FocusLauncherContext'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import { AddTask } from './AddTask'
import { useFocusTaskGroups } from '../tasks/useFocusTaskGroups'
import { InputContainer } from '@lib/ui/inputs/InputContainer'
import { LabelText } from '@lib/ui/inputs/LabelText'
import styled from 'styled-components'
import { SeparatedByLine } from '@lib/ui/layout/SeparatedByLine'

const Container = styled(SeparatedByLine)`
  gap: 20px;

  max-height: 320px;
  overflow-y: auto;
`

export const FocusTaskInput = () => {
  const { setState, taskId } = useFocusLauncher()

  const groups = useFocusTaskGroups()

  const options = useMemo(() => {
    return groups.flatMap(({ tasks }) => tasks)
  }, [groups])

  const hasOptions = options.length > 0

  useEffect(() => {
    const option = options.find((option) => option.id === taskId)
    if (!option && options.length) {
      setState((state) => ({
        ...state,
        taskId: shouldBePresent(options[0].id),
        projectId: shouldBePresent(options[0].projectId),
      }))
    }
  }, [options, setState, taskId])

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
