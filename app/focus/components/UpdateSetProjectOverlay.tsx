import { useFocus } from 'focus/hooks/useFocus'
import { ChangeProjectOverlay } from 'projects/components/ChangeProjectOverlay'
import { ClosableComponentProps } from 'shared/props'
import { assertDefined } from 'shared/utils/assertDefined'

export const UpdateSetProjectOverlay = ({
  onClose,
}: ClosableComponentProps) => {
  const { currentSet, updateProject } = useFocus()
  const { projectId } = assertDefined(currentSet)

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
