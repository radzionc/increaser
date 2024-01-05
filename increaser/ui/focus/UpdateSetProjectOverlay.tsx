import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { ClosableComponentProps } from '@lib/ui/props'
import { ChangeProjectOverlay } from '../projects/ChangeProjectOverlay'

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
