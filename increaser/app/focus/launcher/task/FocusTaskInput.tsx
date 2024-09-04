import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import styled from 'styled-components'
import { useFilteredFocusTasks } from '../../tasks/useFilteredFocusTasks'
import { FocusTaskOption } from './FocusTaskOption'
import { useState } from 'react'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { FocusEntityInputHeader } from '../FocusEntityInputHeader'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useEffectOnDependencyChange } from '@lib/ui/hooks/useEffectOnDependencyChange'
import { productToolIconRecord } from '@increaser/ui/tools/productToolIconRecord'
import { EditTaskFormContent } from '@increaser/ui/tasks/form/EditTaskFormContent'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskPrompt } from './AddTaskPrompt'
import { AddFocusTaskOverlay } from './AddFocusTaskOverlay'
import { AddFocusEntityOption } from '../AddFocusEntityOption'
import { FocusEntityOptionsContainer } from '../FocusEntityOptionsContainer'

const Wrapper = styled.div`
  padding: 0;
`

export const FocusTaskInput = () => {
  const [isOpen, setIsOpen] = useState(false)

  const options = useFilteredFocusTasks()

  const [{ taskId }, setState] = useFocusLauncher()

  const { projects, tasks } = useAssertUserState()

  useEffectOnDependencyChange(() => {
    setIsOpen(false)
  }, [taskId])

  const [isEditing, setIsEditing] = useState(false)

  const [isAddingTask, setIsAddingTask] = useState(false)

  return (
    <>
      {isEmpty(options) ? (
        <AddTaskPrompt onClick={() => setIsAddingTask(true)} />
      ) : (
        <Wrapper>
          <FocusEntityInputHeader
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onRemove={() => {
              setState((state) => ({ ...state, taskId: null }))
            }}
            entityName="a task"
            value={taskId ? tasks[taskId] : null}
            renderValue={(task) => (
              <>
                <EmojiTextPrefix emoji={projects[task.projectId].emoji} />
                {task.name}
              </>
            )}
            icon={productToolIconRecord.tasks}
          />
          {isOpen && (
            <FocusEntityOptionsContainer>
              {options.map((task) => (
                <CurrentTaskProvider value={task} key={task.id}>
                  <FocusTaskOption />
                </CurrentTaskProvider>
              ))}
              <AddFocusEntityOption
                focusEntityName="a task"
                onClick={() => setIsAddingTask(true)}
              />
            </FocusEntityOptionsContainer>
          )}
          {isEditing && taskId && (
            <CurrentTaskProvider value={tasks[taskId]}>
              <EditTaskFormContent onFinish={() => setIsEditing(false)} />
            </CurrentTaskProvider>
          )}
        </Wrapper>
      )}

      {isAddingTask && (
        <AddFocusTaskOverlay onFinish={() => setIsAddingTask(false)} />
      )}
    </>
  )
}
