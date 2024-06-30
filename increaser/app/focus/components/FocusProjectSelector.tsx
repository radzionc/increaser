import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'

export const FocusProjectSelector = () => {
  const { updateProject } = useFocus()
  const { projectId } = useCurrentFocus()
  const activeProjects = useActiveProjects()
  const { projects } = useAssertUserState()

  return (
    <ExpandableSelector
      value={projectId}
      showToggle={false}
      openerContent={<Text color="contrast">{projects[projectId].emoji}</Text>}
      floatingOptionsWidthSameAsOpener={false}
      onChange={updateProject}
      options={activeProjects.map((project) => project.id)}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <>
          <Text color="contrast">{projects[option].emoji}</Text>
          <Text>{projects[option].name}</Text>
        </>
      )}
    />
  )
}
