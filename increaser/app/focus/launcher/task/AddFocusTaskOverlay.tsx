import React from 'react'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { endOfDay } from 'date-fns'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { FinishableComponentProps } from '@lib/ui/props'

export const AddFocusTaskOverlay = ({ onFinish }: FinishableComponentProps) => {
  const [, setState] = useFocusLauncher()
  const [{ projectId }] = useFocusLauncher()

  return (
    <PanelModal width={560} onFinish={onFinish}>
      <CreateTaskForm
        defaultValue={{
          projectId: projectId || undefined,
          deadlineAt: endOfDay(Date.now()).getTime(),
        }}
        onFinish={(task) => {
          // wait for mutation to finish
          if (task) return

          onFinish()
        }}
        onMutationFinish={(task) => {
          if (task) {
            setState((state) => ({
              ...state,
              projectId: task.projectId,
              taskId: task.id,
            }))
          }
          onFinish()
        }}
      />
    </PanelModal>
  )
}
