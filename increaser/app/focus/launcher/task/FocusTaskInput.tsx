import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import styled from 'styled-components'
import { VStack } from '@lib/ui/layout/Stack'
import { useFilteredFocusTasks } from '../../tasks/useFilteredFocusTasks'
import { FocusTaskOption } from './FocusTaskOption'
import { AddTask } from './AddTask'
import { useState } from 'react'
import { toSizeUnit } from '@lib/ui/css/toSizeUnit'
import { panelDefaultPadding } from '@lib/ui/panel/Panel'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { FocusEntityInputHeader } from '../FocusEntityInputHeader'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useEffectOnDependencyChange } from '@lib/ui/hooks/useEffectOnDependencyChange'

const Wrapper = styled.div`
  padding: 0;
`

const Container = styled(VStack)`
  gap: 4px;
  padding: ${toSizeUnit(panelDefaultPadding)};
  padding-top: 4px;
`

export const FocusTaskInput = () => {
  const [isOpen, setIsOpen] = useState(false)

  const options = useFilteredFocusTasks()

  const [{ taskId }, setState] = useFocusLauncher()

  const { projects, tasks } = useAssertUserState()

  useEffectOnDependencyChange(() => {
    setIsOpen(false)
  }, [taskId])

  return (
    <Wrapper>
      <FocusEntityInputHeader
        value={isOpen}
        onChange={setIsOpen}
        onRemove={() => {
          setState((state) => ({ ...state, taskId: null }))
        }}
        label={
          taskId ? (
            <>
              <EmojiTextPrefix
                emoji={projects[tasks[taskId].projectId].emoji}
              />
              {tasks[taskId].name}
            </>
          ) : (
            'Select a task ...'
          )
        }
      />
      {isOpen && (
        <Container>
          {options.map((task) => (
            <CurrentTaskProvider value={task} key={task.id}>
              <FocusTaskOption />
            </CurrentTaskProvider>
          ))}
          <AddTask />
        </Container>
      )}
    </Wrapper>
  )
}
