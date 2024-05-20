import { useCurrentFocus } from '@increaser/ui/focus/CurrentFocusProvider'
import { useFocus } from '@increaser/ui/focus/FocusContext'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { Text } from '@lib/ui/text'

export const FocusProjectSelector = () => {
  const { updateProject } = useFocus()
  const { projectId } = useCurrentFocus()
  const { activeProjects, projectsRecord } = useProjects()

  return (
    <ExpandableSelector
      value={projectId}
      showToggle={false}
      openerContent={
        <Text color="contrast">{projectsRecord[projectId].emoji}</Text>
      }
      floatingOptionsWidthSameAsOpener={false}
      onChange={updateProject}
      options={activeProjects.map((project) => project.id)}
      getOptionKey={(option) => option}
      renderOption={(option) => (
        <>
          <Text color="contrast">{projectsRecord[option].emoji}</Text>
          <Text>{projectsRecord[option].name}</Text>
        </>
      )}
    />
  )
}
