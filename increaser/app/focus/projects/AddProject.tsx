import { Opener } from '@lib/ui/base/Opener'
import React from 'react'
import { CreateProjectForm } from '@increaser/ui/projects/form/CreateProjectForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { Project } from '@increaser/entities/Project'
import { AddFocusEntityOption } from '../launcher/AddFocusEntityOption'
import { useFocusTarget } from '../state/useFocusTarget'

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
              onClose()

              if (project) {
                setState((state) => ({
                  ...state,
                  projectId: project.id,
                  taskId: null,
                }))
                onFinish?.(project)
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
