import { Opener } from '@lib/ui/base/Opener'
import { ListAddButton } from '@lib/ui/list/ListAddButton'
import { CreateProjectForm } from './form/CreateProjectForm'
import { useProjectStatusFilter } from './filter/status/ProjectStatusFilterProvider'

export const CreateProjectPrompt = () => {
  const [status] = useProjectStatusFilter()

  if (status !== 'active') return null

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <ListAddButton onClick={onOpen} text="Add a project" />
      )}
      renderContent={({ onClose }) => <CreateProjectForm onFinish={onClose} />}
    />
  )
}
