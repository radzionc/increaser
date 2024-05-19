import { useFocus } from '@increaser/ui/focus/FocusContext'
import { ActiveProjectSelector } from '@increaser/ui/projects/ActiveProjectSelector'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'

export const FocusProjectSelector = () => {
  const { updateProject, currentSet } = useFocus()

  return (
    <ActiveProjectSelector
      value={shouldBePresent(currentSet).projectId}
      onChange={(projectId) => updateProject(projectId)}
    />
  )
}
