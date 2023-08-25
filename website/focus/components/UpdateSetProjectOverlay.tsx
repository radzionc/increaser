import { useFocus } from 'focus/hooks/useFocus'
import { ChangeProjectOverlay } from 'projects/components/ChangeProjectOverlay'
import { ClosableComponentProps } from 'shared/props'
import { useCurrentFocus } from './CurrentFocusProvider'

export const UpdateSetProjectOverlay = ({
  onClose,
}: ClosableComponentProps) => {
  const { updateProject } = useFocus()
  const { projectId } = useCurrentFocus()

  return (
    <ChangeProjectOverlay
      initialValue={projectId}
      onClose={onClose}
      onSubmit={(projectId) => {
        updateProject(projectId)
        onClose()
      }}
    />
  )
}
