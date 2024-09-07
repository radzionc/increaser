import { Opener } from '@lib/ui/base/Opener'
import React from 'react'
import { CreateProjectForm } from '@increaser/ui/projects/form/CreateProjectForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useFocusTarget } from '../../state/useFocusTarget'
import { Project } from '@increaser/entities/Project'
import { AddFocusEntityOption } from '../AddFocusEntityOption'

type AddProjectProps = {
  onFinish?: (project?: Project) => void
}

export const AddProject = ({ onFinish }: AddProjectProps) => {
  const [, setState] = useFocusTarget()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <AddFocusEntityOption onClick={onOpen} focusEntityName="a project" />
      )}
      renderContent={({ onClose }) => (
        <PanelModal width={460} onFinish={onClose}>
          <CreateProjectForm
            onFinish={(project) => {
              // wait for mutation to finish
              if (project) return

              onFinish?.()
              onClose()
            }}
            onMutationFinish={(project) => {
              onClose()
              onFinish?.(project)

              if (project) {
                setState((state) => ({
                  ...state,
                  projectId: project.id,
                  taskId: null,
                }))
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
