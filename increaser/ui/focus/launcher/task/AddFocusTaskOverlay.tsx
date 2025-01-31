import React from 'react'
import { CreateTaskForm } from '@increaser/ui/tasks/form/CreateTaskForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { OnFinishProp } from '@lib/ui/props'
import { withoutUndefinedFields } from '@lib/utils/record/withoutUndefinedFields'
import { useFocusTarget } from '@increaser/ui/focus/state/focusTarget'
import { useFocusProject } from '@increaser/ui/focus/state/focusProject'
import { useFocusProjectTask } from '@increaser/ui/focus/state/focusProjectTask'

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
