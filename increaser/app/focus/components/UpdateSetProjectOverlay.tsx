import { useFocus } from '@increaser/app/focus/hooks/useFocus'
import { ChangeProjectOverlay } from '@increaser/app/projects/components/ChangeProjectOverlay'
import { ClosableComponentProps } from '@lib/ui/props'
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
