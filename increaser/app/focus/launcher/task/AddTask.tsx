import { Opener } from '@lib/ui/base/Opener'
import React from 'react'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { endOfDay } from 'date-fns'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { AddFocusEntityPrompt } from '../AddFocusEntityPrompt'

export const AddTask = () => {
  const [, setState] = useFocusLauncher()
  const [{ projectId }] = useFocusLauncher()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <AddFocusEntityPrompt onClick={onOpen}>Add a task</AddFocusEntityPrompt>
      )}
      renderContent={({ onClose }) => (
        <PanelModal width={560} onFinish={onClose}>
          <CreateTaskForm
            defaultValue={{
              projectId: projectId || undefined,
              deadlineAt: endOfDay(Date.now()).getTime(),
            }}
            onFinish={(task) => {
              // wait for mutation to finish
              if (task) return

              onClose()
            }}
            onMutationFinish={(task) => {
              onClose()
              if (task) {
                setState((state) => ({
                  ...state,
                  projectId: task.projectId,
                  taskId: task.id,
                }))
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
