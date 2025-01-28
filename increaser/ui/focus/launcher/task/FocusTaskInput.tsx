import { CurrentTaskProvider } from '@increaser/ui/tasks/CurrentTaskProvider'
import styled from 'styled-components'
import { useFilteredFocusTasks } from '@increaser/ui/focus/tasks/useFilteredFocusTasks'
import { FocusTaskOption } from './FocusTaskOption'
import { useState } from 'react'
import { useUser } from '@increaser/ui/user/state/user'
import { useRunOnChange } from '@lib/ui/hooks/useRunOnChange'
import { EditTaskFormContent } from '@increaser/ui/tasks/form/EditTaskFormContent'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { AddTaskPrompt } from './AddTaskPrompt'
import { AddFocusTaskOverlay } from './AddFocusTaskOverlay'
import { AddFocusEntityOption } from '../focusEntity/AddFocusEntityOption'
import { FocusEntityOptionsContainer } from '../focusEntity/FocusEntityOptionsContainer'
import { FocusTaskInputHeader } from './FocusTaskInputHeader'
import { useFocusTarget } from '@increaser/ui/focus/state/focusTarget'
import { useFocusProjectTask } from '@increaser/ui/focus/state/focusProjectTask'
import { omit } from '@lib/utils/record/omit'
import { FocusLauncherField } from '../FocusLauncherField'
import { Panel } from '@lib/ui/css/panel'
import { FocusTaskActions } from './FocusTaskActions'

const Wrapper = styled.div`
  padding: 0;
`

export const FocusTaskInput = () => {
  const [isOpen, setIsOpen] = useState(false)

  const options = useFilteredFocusTasks()

  const { taskId, projectId } = useFocusTarget()

  const [, setProjectTask] = useFocusProjectTask()

  const { tasks } = useUser()

  useRunOnChange(() => {
    setIsOpen(false)
  }, [taskId])

  const [isEditing, setIsEditing] = useState(false)

  const [isAddingTask, setIsAddingTask] = useState(false)

  return (
    <FocusLauncherField
      label="Focus task (optional)"
      action={<FocusTaskActions />}
    >
      <Panel kind="secondary" withSections>
        {isEmpty(options) ? (
          <AddTaskPrompt onClick={() => setIsAddingTask(true)} />
        ) : (
          <Wrapper>
            <FocusTaskInputHeader
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onRemove={() => {
                if (projectId) {
                  setProjectTask((prev) => omit(prev, projectId))
                }
              }}
              value={taskId ? tasks[taskId] : null}
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
      </Panel>
    </FocusLauncherField>
  )
}
