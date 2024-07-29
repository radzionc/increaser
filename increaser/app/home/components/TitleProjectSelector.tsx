import { ClickableTitlePart } from './ClickableTitlePart'
import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { EmojiTextPrefix } from '@lib/ui/text/EmojiTextPrefix'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ProjectSelector } from '@increaser/ui/projects/ProjectSelector'

export const TitleProjectSelector = () => {
  const { projectId } = useCurrentFocus()
  const { projects } = useAssertUserState()
  const { updateProject } = useFocus()

  return (
    <>
      <ProjectSelector
        renderOpener={(props) => (
          <ClickableTitlePart {...props} as="span">
            <EmojiTextPrefix emoji={projects[projectId].emoji} />
            {projects[projectId].name}
          </ClickableTitlePart>
        )}
        value={projectId}
        onChange={(projectId) => {
          updateProject(projectId)
        }}
      />
    </>
  )
}
