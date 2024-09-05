import { Opener } from '@lib/ui/base/Opener'
import React from 'react'
import { CreateProjectForm } from '@increaser/ui/projects/form/CreateProjectForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { useFocusLauncher } from '../state/useFocusLauncher'
import { Project } from '@increaser/entities/Project'
import { AddFocusEntityOption } from '../AddFocusEntityOption'

type AddProjectProps = {
  onFinish?: (project?: Project) => void
}

export const AddProject = ({ onFinish }: AddProjectProps) => {
  const [, setState] = useFocusLauncher()

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
