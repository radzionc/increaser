import { ChangeProjectOverlay } from '@increaser/app/projects/components/ChangeProjectOverlay'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { ClosableComponentProps } from '@lib/ui/props'

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
