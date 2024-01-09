import { Opener } from '@lib/ui/base/Opener'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ShyFocusButton } from '@increaser/ui/focus/ShyFocusButton'
import { UpdateSetProjectOverlay } from '@increaser/ui/focus/UpdateSetProjectOverlay'
import styled from 'styled-components'
import { getColor } from '@lib/ui/theme/getters'

const Button = styled(ShyFocusButton)`
  color: ${getColor('contrast')};
`

export const FocusProject = () => {
  const { currentSet: optionalCurrentSet } = useFocus()
  const { projectId } = shouldBeDefined(optionalCurrentSet)

  const { projectsRecord } = useProjects()
  const project = projectsRecord[projectId]

  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button onClick={onOpen}>{project.emoji}</Button>
      )}
      renderContent={({ onClose }) => (
        <UpdateSetProjectOverlay onClose={onClose} />
      )}
    />
  )
}
