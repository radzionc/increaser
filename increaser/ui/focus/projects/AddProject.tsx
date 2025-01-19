import { Opener } from '@lib/ui/base/Opener'
import { CreateProjectForm } from '@increaser/ui/projects/form/CreateProjectForm'
import { PanelModal } from '@lib/ui/modal/PanelModal'
import { Project } from '@increaser/entities/Project'
import { AddFocusEntityOption } from '../launcher/focusEntity/AddFocusEntityOption'
import { useFocusProject } from '../state/focusProject'

type AddProjectProps = {
  onFinish?: (project?: Project) => void
}

export const AddProject = ({ onFinish }: AddProjectProps) => {
  const [, setState] = useFocusProject()

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <AddFocusEntityOption onClick={onOpen} focusEntityName="a project" />
      )}
      renderContent={({ onClose }) => (
        <PanelModal onFinish={onClose}>
          <CreateProjectForm
            onFinish={(project) => {
              onClose()

              if (project) {
                setState(project.id)
                onFinish?.(project)
              }
            }}
          />
        </PanelModal>
      )}
    />
  )
}
