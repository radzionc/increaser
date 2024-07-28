import { Opener } from '@lib/ui/base/Opener'
import React from 'react'
import { FocusOptionContainer } from './FocusOptionContainer'
import { PlusIcon } from '@lib/ui/icons/PlusIcon'
import styled from 'styled-components'
import { FocusOptionContent } from './FocusOptionContent'
import { TaskFormOverlay } from '@increaser/ui/tasks/form/TaskFormOverlay'
import { CreateProjectForm } from '@increaser/ui/projects/form/CreateProjectForm'
import { useFocusLauncher } from './state/FocusLauncherContext'

const Container = styled(FocusOptionContainer)``

export const AddProject = () => {
  const { setState } = useFocusLauncher()

  return (
    <Opener
      renderOpener={({ onOpen, isOpen }) =>
        isOpen ? null : (
          <Container
            onClick={onOpen}
            as="button"
            type="button"
            selected={false}
          >
            <FocusOptionContent prefix={<PlusIcon />}>
              Add a project
            </FocusOptionContent>
          </Container>
        )
      }
      renderContent={({ onClose }) => (
        <TaskFormOverlay width={460} onFinish={onClose}>
          <CreateProjectForm
            onFinish={(project) => {
              // wait for mutation to finish
              if (project) return

              onClose()
            }}
            onMutationFinish={(project) => {
              onClose()
              if (project) {
                setState((state) => ({
                  ...state,
                  projectId: project.id,
                  taskId: null,
                }))
              }
            }}
          />
        </TaskFormOverlay>
      )}
    />
  )
}
