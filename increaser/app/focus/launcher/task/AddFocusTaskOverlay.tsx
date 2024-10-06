import React from 'react'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useFocusTarget } from '../../state/useFocusTarget'
import { NoValueFinishProps } from '@lib/ui/props'
import { withoutUndefinedFields } from '@lib/utils/record/withoutUndefinedFields'

export const AddFocusTaskOverlay = ({ onFinish }: NoValueFinishProps) => {
  const [, setState] = useFocusTarget()
  const [{ projectId }] = useFocusTarget()

  return (
    <PanelModal width={560} onFinish={onFinish}>
      <CreateTaskForm
        defaultValue={withoutUndefinedFields({
          projectId: projectId ?? undefined,
        })}
        onFinish={(task) => {
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
