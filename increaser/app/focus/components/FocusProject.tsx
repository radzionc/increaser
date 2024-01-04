import { useFocus } from '@increaser/app/focus/hooks/useFocus'

import { Opener } from '@lib/ui/base/Opener'
import { UpdateSetProjectOverlay } from './UpdateSetProjectOverlay'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useProjects } from '../../projects/hooks/useProjects'
import { ShyFocusButton } from './ShyFocusButton'

export const FocusProject = () => {
  const { currentSet: optionalCurrentSet } = useFocus()
  const { projectId } = shouldBeDefined(optionalCurrentSet)

  const { projectsRecord } = useProjects()
  const project = projectsRecord[projectId]

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <ShyFocusButton onClick={onOpen}>{project.emoji}</ShyFocusButton>
      )}
      renderContent={({ onClose }) => (
        <UpdateSetProjectOverlay onClose={onClose} />
      )}
    />
  )
}
