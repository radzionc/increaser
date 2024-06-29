import { Opener } from '@lib/ui/base/Opener'
import { ListAddButton } from '@lib/ui/list/ListAddButton'
import { CreateProjectForm } from './form/CreateProjectForm'

export const CreateProjectPrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <ListAddButton onClick={onOpen} text="Add a project" />
      )}
      renderContent={({ onClose }) => <CreateProjectForm onFinish={onClose} />}
    />
  )
}
