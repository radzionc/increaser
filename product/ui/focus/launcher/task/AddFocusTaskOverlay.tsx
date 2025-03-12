import { PanelModal } from '@lib/ui/modal/PanelModal'
import { OnFinishProp } from '@lib/ui/props'
import { withoutUndefinedFields } from '@lib/utils/record/withoutUndefinedFields'
import { useFocusProject } from '@product/ui/focus/state/focusProject'
import { useFocusProjectTask } from '@product/ui/focus/state/focusProjectTask'
import { useFocusTarget } from '@product/ui/focus/state/focusTarget'
import { CreateTaskForm } from '@product/ui/tasks/form/CreateTaskForm'
import React from 'react'

export const AddFocusTaskOverlay = ({ onFinish }: OnFinishProp) => {
  const { projectId } = useFocusTarget()
  const [, setProject] = useFocusProject()
  const [, setProjectTask] = useFocusProjectTask()

  return (
    <PanelModal width={560} onFinish={onFinish}>
      <CreateTaskForm
        initialValue={withoutUndefinedFields({
          projectId: projectId ?? undefined,
        })}
        onFinish={(task) => {
          if (task) {
            setProject(task.projectId)
            setProjectTask((prev) => ({
              ...prev,
              [task.projectId]: task.id,
            }))
          }
          onFinish()
        }}
      />
    </PanelModal>
  )
}
