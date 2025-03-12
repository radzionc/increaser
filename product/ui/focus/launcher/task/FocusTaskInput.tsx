import { Panel } from '@lib/ui/css/panel'
import { useRunOnChange } from '@lib/ui/hooks/useRunOnChange'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { omit } from '@lib/utils/record/omit'
import { useFocusProjectTask } from '@product/ui/focus/state/focusProjectTask'
import { useFocusTarget } from '@product/ui/focus/state/focusTarget'
import { useFilteredFocusTasks } from '@product/ui/focus/tasks/useFilteredFocusTasks'
import { CurrentTaskProvider } from '@product/ui/tasks/CurrentTaskProvider'
import { EditTaskFormContent } from '@product/ui/tasks/form/EditTaskFormContent'
import { useUser } from '@product/ui/user/state/user'
import { useState } from 'react'
import styled from 'styled-components'

import { AddFocusEntityOption } from '../focusEntity/AddFocusEntityOption'
import { FocusEntityOptionsContainer } from '../focusEntity/FocusEntityOptionsContainer'
import { FocusLauncherField } from '../FocusLauncherField'

import { AddFocusTaskOverlay } from './AddFocusTaskOverlay'
import { AddTaskPrompt } from './AddTaskPrompt'
import { FocusTaskActions } from './FocusTaskActions'
import { FocusTaskInputHeader } from './FocusTaskInputHeader'
import { FocusTaskOption } from './FocusTaskOption'

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
